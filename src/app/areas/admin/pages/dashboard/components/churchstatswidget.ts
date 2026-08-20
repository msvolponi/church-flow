import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { catchError, forkJoin, of } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';

import { PersonModel } from '@/app/areas/admin/models/person.model';
import { PersonService } from '@/app/core/services/person.service';
import { MemberTypeOptions } from '@/app/shared/enums/member-type';
import {
    calculateAge,
    daysUntil,
    formatMonthPt,
    getCurrentMonthIndex,
    getNextBirthdayDate,
    isBirthdayThisMonth,
    isBirthdayToday,
    isNewMemberThisMonth
} from '@/app/shared/helpers/date.helper';
import { PersonMapper } from '@/app/shared/mappers/person.mapper';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { Router } from '@angular/router';
import { AttentionItemModel } from '../../../models/attention-item.model';
import { FollowUpResponse } from '@/app/shared/dtos/follow-up.response';
import { FollowUpService } from '@/app/core/services/follow-up.service';

@Component({
    standalone: true,
    selector: 'app-admin-church-stats-widget',
    imports: [CommonModule, ButtonModule, SkeletonModule],
    templateUrl: './churchstatswidget.html',
})
export class AdminChurchStatsWidget implements OnInit {

    loading = signal(true);
    people = signal<PersonModel[]>([]);

    summaryCards = signal<any[]>([]);
    birthdays: { person: PersonModel; day: number; age: number; isToday: boolean }[] = [];
    distribution: { label: string; count: number; percent: number }[] = [];
    nextBirthdays: { person: PersonModel; label: string; age: number }[] = [];
    attentionItems: AttentionItemModel[] = [];
    followUpSummary = signal({ pending: 0, upcoming: 0 });
    followUpLoading = signal(true);

    monthName = formatMonthPt(getCurrentMonthIndex());

    constructor(
        private personService: PersonService,
        private followUpService: FollowUpService,
        private toastMessageService: ToastMessageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.personService.list().subscribe({
            next: peopleResp => {
                const list = peopleResp.map(p => PersonMapper.toModel(p));
                this.people.set(list);
                this.process(list);
                this.loadFollowUpSummary(list);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.toastMessageService.error('Erro ao carregar dados do dashboard', 'Dashboard');
            }
        });
    }

    private process(list: PersonModel[]): void {
        const total = list.length;
        const birthdaysThisMonth = list.filter(p => isBirthdayThisMonth(p.birthDate) && p.birthDate);
        const baptized = list.filter(p => p.baptizedInWater === true).length;
        const newThisMonth = list.filter(p => isNewMemberThisMonth(p.memberSince)).length;

        this.summaryCards.set([
            { title: 'Pessoas', value: total, description: 'Pessoas cadastradas', icon: 'pi pi-users' },
            { title: 'Aniversariantes', value: birthdaysThisMonth.length, description: 'Neste mês', icon: 'pi pi-gift' },
            { title: 'Batizados', value: baptized, description: 'Batizados nas águas', icon: 'pi pi-heart' },
            { title: 'Novos este mês', value: newThisMonth, description: 'Novos este mês', icon: 'pi pi-user-plus' }
        ]);

        this.attentionItems = [
            {
                label: 'pessoas sem telefone',
                count: list.filter(p => !p.cellphone?.trim() && !p.phone?.trim()).length,
                icon: 'pi pi-phone',
                filter: 'missing-phone'
            },
            {
                label: 'pessoas sem data de nascimento',
                count: list.filter(p => !p.birthDate?.trim()).length,
                icon: 'pi pi-calendar',
                filter: 'missing-birth-date'
            },
            {
                label: 'pessoas sem e-mail',
                count: list.filter(p => !p.email?.trim()).length,
                icon: 'pi pi-envelope',
                filter: 'missing-email'
            },
            {
                label: 'pessoas não batizadas',
                count: list.filter(p => p.baptizedInWater === false).length,
                icon: 'pi pi-heart',
                filter: 'not-baptized'
            }
        ]
            .filter(item => item.count > 0)
            .sort((a, b) => b.count - a.count);

        this.birthdays = birthdaysThisMonth
            .map(p => ({ person: p, day: (p.birthDate ? Number(p.birthDate.split('-')[2]) : 0), age: calculateAge(p.birthDate) || 0, isToday: isBirthdayToday(p.birthDate) }))
            .filter(x => x.day > 0)
            .sort((a, b) => a.day - b.day || a.person.fullName.localeCompare(b.person.fullName));

        const counts: { label: string; count: number }[] = MemberTypeOptions.OPTIONS.map(opt => ({ label: opt.label, count: 0 }));
        for (const p of list) {
            const opt = MemberTypeOptions.OPTIONS.find(o => o.value === p.memberType);
            if (opt) {
                const item = counts.find(c => c.label === opt.label)!;
                item.count++;
            }
        }
        const max = Math.max(...counts.map(c => c.count), 1);
        this.distribution = counts.map(c => ({ label: c.label, count: c.count, percent: Math.round((c.count / max) * 100) }));

        const next = list
            .map(p => ({ person: p, nextDate: getNextBirthdayDate(p.birthDate), age: calculateAge(p.birthDate) || 0 }))
            .filter(x => x.nextDate)
            .map(x => ({ person: x.person, nextDate: x.nextDate!, days: daysUntil(x.nextDate!), age: x.age }))
            .sort((a, b) => a.days - b.days)
            .slice(0, 5)
            .map(x => ({ person: x.person, label: x.days === 0 ? 'Hoje' : (x.days === 1 ? 'Amanhã' : `${x.person.birthDate ? new Date(x.person.birthDate).getDate() + ' de ' + formatMonthPt(new Date(x.person.birthDate).getMonth()) : ''}`), age: x.age }));

        this.nextBirthdays = next;
    }

    private loadFollowUpSummary(list: PersonModel[]): void {
        this.followUpLoading.set(true);
        if (list.length === 0) {
            this.followUpSummary.set({ pending: 0, upcoming: 0 });
            this.followUpLoading.set(false);
            return;
        }

        forkJoin(list.map(person => this.followUpService.listByPerson(person.id!).pipe(catchError(() => of([] as FollowUpResponse[]))))).subscribe({
            next: followUpsByPerson => {
                const followUps = followUpsByPerson.flat();
                const today = this.startOfToday();
                const nextWeek = new Date(today);
                nextWeek.setDate(nextWeek.getDate() + 7);

                const pending = followUps.filter(item => item.requiresFollowUp && !!item.nextFollowUpDate && this.parseDate(item.nextFollowUpDate) < today).length;
                const upcoming = followUps.filter(item => {
                    if (!item.requiresFollowUp || !item.nextFollowUpDate) {
                        return false;
                    }
                    const nextDate = this.parseDate(item.nextFollowUpDate);
                    return nextDate >= today && nextDate <= nextWeek;
                }).length;

                this.followUpSummary.set({ pending, upcoming });
                this.followUpLoading.set(false);
            },
            error: () => {
                this.followUpSummary.set({ pending: 0, upcoming: 0 });
                this.followUpLoading.set(false);
            }
        });
    }

    private parseDate(value: string): Date {
        const [year, month, day] = value.slice(0, 10).split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    private startOfToday(): Date {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }

    call(phone: string): void {
        try { window.location.href = `tel:${phone}`; } catch { }
    }

    viewAll(): void {
        this.router.navigate(['/admin/person/list']);
    }

    viewFollowUps(): void {
        this.router.navigate(['/admin/follow-up']);
    }
}
