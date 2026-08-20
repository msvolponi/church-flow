import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, catchError, of } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';

import { FollowUpModel } from '@/app/areas/admin/models/follow-up.model';
import { PersonService } from '@/app/core/services/person.service';
import { FollowUpService } from '@/app/core/services/follow-up.service';
import { FollowUpResponse } from '@/app/shared/dtos/follow-up.response';
import { PersonMapper } from '@/app/shared/mappers/person.mapper';
import { FollowUpMapper } from '@/app/shared/mappers/follow-up.mapper';
import { FollowUpType, FollowUpTypeOptions } from '@/app/shared/enums/follow-up-type';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { PersonModel } from '../../models/person.model';

@Component({
    selector: 'app-follow-up-list',
    standalone: true,
    imports: [CommonModule, ButtonModule, SkeletonModule, TabsModule],
    templateUrl: './follow-up-list.html'
})
export class FollowUpList implements OnInit {
    people = signal<PersonModel[]>([]);
    followUps = signal<FollowUpModel[]>([]);
    loading = signal(true);
    activeTab = signal('0');

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
            next: responses => {
                const people = responses.map(response => PersonMapper.toModel(response));
                this.people.set(people);
                this.loadFollowUps(people);
            },
            error: () => {
                this.loading.set(false);
                this.toastMessageService.error('Erro ao carregar pessoas', 'Acompanhamentos');
            }
        });
    }

    private loadFollowUps(people: PersonModel[]): void {
        if (people.length === 0) {
            this.followUps.set([]);
            this.loading.set(false);
            return;
        }

        forkJoin(people.map(person => this.followUpService.listByPerson(person.id!).pipe(
            catchError(() => of([] as FollowUpResponse[]))
        ))).subscribe({
            next: responses => {
                this.followUps.set(responses.flat().map(response => FollowUpMapper.toModel(response)));
                this.loading.set(false);
            },
            error: () => {
                this.followUps.set([]);
                this.loading.set(false);
                this.toastMessageService.error('Erro ao carregar acompanhamentos', 'Acompanhamentos');
            }
        });
    }

    setTab(value: string | number | undefined): void {
        this.activeTab.set(String(value ?? '0'));
    }

    visibleFollowUps(): FollowUpModel[] {
        const followUps = this.followUps().slice().sort((a, b) => b.date.localeCompare(a.date));
        const today = this.startOfToday();
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        switch (this.activeTab()) {
            case '0':
                return followUps.filter(item => this.isPending(item, today));
            case '1':
                return followUps.filter(item => this.isUpcoming(item, today, nextWeek));
            default:
                return followUps;
        }
    }

    tabCount(tab: string): number {
        const today = this.startOfToday();
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        const followUps = this.followUps();

        if (tab === '0') {
            return followUps.filter(item => this.isPending(item, today)).length;
        }
        if (tab === '1') {
            return followUps.filter(item => this.isUpcoming(item, today, nextWeek)).length;
        }
        return followUps.length;
    }

    openFollowUp(followUp: FollowUpModel): void {
        this.router.navigate(['/admin/person', followUp.personId, 'follow-ups']);
    }

    typeIcon(type: FollowUpType): string {
        return FollowUpTypeOptions.OPTIONS.find(option => option.value === type)?.icon || 'pi pi-file';
    }

    formatDate(value: string | null | undefined): string {
        if (!value) {
            return '';
        }
        const [year, month, day] = value.slice(0, 10).split('-');
        return `${day}/${month}/${year}`;
    }

    private isPending(item: FollowUpModel, today: Date): boolean {
        return item.requiresFollowUp && !!item.nextFollowUpDate && this.parseDate(item.nextFollowUpDate) < today;
    }

    private isUpcoming(item: FollowUpModel, today: Date, nextWeek: Date): boolean {
        if (!item.requiresFollowUp || !item.nextFollowUpDate) {
            return false;
        }
        const date = this.parseDate(item.nextFollowUpDate);
        return date >= today && date <= nextWeek;
    }

    private parseDate(value: string): Date {
        const [year, month, day] = value.slice(0, 10).split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    private startOfToday(): Date {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    }
}
