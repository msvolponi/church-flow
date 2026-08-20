import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import { TimelineModule } from 'primeng/timeline';

import { FollowUpModel } from '@/app/areas/admin/models/follow-up.model';
import { PersonModel } from '@/app/areas/admin/models/person.model';
import { FollowUpService } from '@/app/core/services/follow-up.service';
import { PersonService } from '@/app/core/services/person.service';
import { calculateAge } from '@/app/shared/helpers/date.helper';
import { PersonMapper } from '@/app/shared/mappers/person.mapper';
import { FollowUpMapper } from '@/app/shared/mappers/follow-up.mapper';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { FollowUpType, FollowUpTypeOptions } from '@/app/shared/enums/follow-up-type';
import { GenderOptions } from '@/app/shared/enums/gender';
import { MaritalStatusOptions } from '@/app/shared/enums/marital-status';
import { StateOptions } from '@/app/shared/enums/states';
import { FollowUpForm } from './follow-up-form';

@Component({
    selector: 'app-follow-up-page',
    standalone: true,
    imports: [CommonModule, ButtonModule, ConfirmDialogModule, DialogModule, FollowUpForm, SkeletonModule, TimelineModule],
    providers: [ConfirmationService],
    templateUrl: './follow-up-page.html'
})
export class FollowUpPage implements OnInit {
    personId = 0;
    person = signal<PersonModel | null>(null);
    followUps = signal<FollowUpModel[]>([]);
    selected: FollowUpModel | null = null;
    loading = signal(true);
    dialog = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private personService: PersonService,
        private followUpService: FollowUpService,
        private confirmationService: ConfirmationService,
        private toastMessageService: ToastMessageService
    ) { }

    ngOnInit(): void {
        this.personId = Number(this.route.snapshot.paramMap.get('id'));
        this.load();
    }

    load(): void {
        this.loading.set(true);
        this.personService.list().subscribe({
            next: people => {
                const personResponse = people.find(item => item.id === this.personId);
                this.person.set(personResponse ? PersonMapper.toModel(personResponse) : null);
                this.loading.set(false);
                if (!this.person()) {
                    this.goBack();
                }
            },
            error: () => {
                this.loading.set(false);
                this.toastMessageService.error('Erro ao carregar a pessoa', 'Acompanhamentos');
                this.goBack();
            }
        });

        this.followUpService.listByPerson(this.personId).subscribe({
            next: responses => {
                const followUps = (responses || []).map(response => FollowUpMapper.toModel(response));
                this.followUps.set(followUps.sort((a, b) => b.date.localeCompare(a.date)));
            },
            error: () => {
                this.followUps.set([]);
                this.toastMessageService.error('Erro ao carregar acompanhamentos', 'Acompanhamentos');
            }
        });
    }

    openCreate(): void {
        this.selected = null;
        this.dialog = true;
    }

    openEdit(followUp: FollowUpModel): void {
        this.selected = followUp;
        this.dialog = true;
    }

    onSaved(): void {
        this.dialog = false;
        this.load();
    }

    onDelete(followUp: FollowUpModel): void {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir este acompanhamento?',
            header: 'Excluir acompanhamento',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => this.followUpService.delete(followUp.id!).subscribe({
                next: () => {
                    this.toastMessageService.success('Acompanhamento excluído com sucesso.', 'Acompanhamentos');
                    this.load();
                },
                error: () => this.toastMessageService.error('Erro ao excluir acompanhamento.', 'Acompanhamentos')
            })
        });
    }

    goBack(): void {
        this.router.navigate(['/admin/person/list']);
    }

    typeIcon(type: FollowUpType): string {
        return FollowUpTypeOptions.OPTIONS.find(option => option.value === type)?.icon || 'pi pi-file';
    }

    age(): number | null {
        return this.person() ? calculateAge(this.person()!.birthDate) : null;
    }

    genderLabel(): string {
        return GenderOptions.OPTIONS.find(option => option.value === this.person()?.gender)?.label || '';
    }

    maritalStatusLabel(): string {
        return MaritalStatusOptions.OPTIONS.find(option => option.value === this.person()?.maritalStatus)?.label || '';
    }

    stateLabel(): string {
        return StateOptions.OPTIONS.find(option => option.value === this.person()?.state)?.label || '';
    }

    address(): string {
        const person = this.person();
        if (!person) {
            return '';
        }
        return [person.street, person.number, person.complement].filter(Boolean).join(', ');
    }

    formatDate(date: string | null | undefined): string {
        if (!date) {
            return '';
        }
        const [year, month, day] = date.slice(0, 10).split('-');
        return `${day}/${month}/${year}`;
    }

    latestDate(): string | null {
        return this.followUps()[0]?.date || null;
    }

    nextDate(): string | null {
        return this.followUps()
            .filter(item => item.requiresFollowUp && item.nextFollowUpDate)
            .map(item => item.nextFollowUpDate!)
            .sort((a, b) => a.localeCompare(b))[0] || null;
    }
}
