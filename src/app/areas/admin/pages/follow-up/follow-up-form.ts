import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

import { FollowUpModel } from '@/app/areas/admin/models/follow-up.model';
import { PersonModel } from '@/app/areas/admin/models/person.model';
import { FollowUpService } from '@/app/core/services/follow-up.service';
import { PersonService } from '@/app/core/services/person.service';
import { FollowUpReasonOptions } from '@/app/shared/enums/follow-up-reason';
import { FollowUpTypeOptions } from '@/app/shared/enums/follow-up-type';
import { Validator } from '@/app/shared/pages/components/validator/validator';
import { ValidatorService } from '@/app/shared/pages/components/validator/validator.service';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { FollowUpMapper } from '@/app/shared/mappers/follow-up.mapper';
import { FollowUpResponse } from '@/app/shared/dtos/follow-up.response';
import { PersonMapper } from '@/app/shared/mappers/person.mapper';

@Component({
    selector: 'app-follow-up-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, CheckboxModule, FluidModule, InputTextModule, SelectModule, TextareaModule, Validator],
    templateUrl: './follow-up-form.html'
})
export class FollowUpForm implements OnInit, OnChanges {
    @Input() personId = 0;
    @Input() personName = '';
    @Input() followUp: FollowUpModel | null = null;
    @Output() saved = new EventEmitter<FollowUpModel>();

    people: PersonModel[] = [];
    types = FollowUpTypeOptions.OPTIONS;
    reasons = FollowUpReasonOptions.OPTIONS;
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private personService: PersonService,
        private followUpService: FollowUpService,
        private validatorService: ValidatorService,
        private toastMessageService: ToastMessageService
    ) {
        this.form = this.fb.group({
            id: [null],
            personId: [this.personId],
            personName: [this.personName],
            responsibleId: [null, Validators.required],
            date: [this.today(), Validators.required],
            type: [null, Validators.required],
            reason: [null, Validators.required],
            location: [''],
            description: ['', Validators.required],
            requiresFollowUp: [false],
            nextFollowUpDate: [{ value: null, disabled: true }]
        });

        this.form.get('requiresFollowUp')!.valueChanges.subscribe((requires: boolean) => {
            this.updateNextDateControl(requires);
        });
    }

    ngOnInit(): void {
        this.personService.list().subscribe({
            next: people => this.people = people.map(person => PersonMapper.toModel(person)),
            error: () => this.toastMessageService.error('Erro ao carregar responsáveis', 'Acompanhamentos')
        });
        this.patchForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['followUp'] && this.form) {
            this.patchForm();
        }
    }

    isValidField(field: string, type: string): boolean {
        return this.validatorService.isValidField(this.form, field, type);
    }

    onSave(): void {
        if (!this.validatorService.validate(this.form)) {
            return;
        }

        const model = new FollowUpModel(this.form.getRawValue());
        const request = FollowUpMapper.toRequest(model);

        if (this.followUp?.id) {
            this.followUpService.update(this.followUp.id, request).subscribe({
                next: response => this.onSuccess(response, 'Acompanhamento atualizado com sucesso.'),
                error: error => this.onError(error)
            });
            return;
        }

        this.followUpService.create(request).subscribe({
            next: response => this.onSuccess(response, 'Acompanhamento registrado com sucesso.'),
            error: error => this.onError(error)
        });
    }

    private onSuccess(response: FollowUpResponse, message: string): void {
        this.toastMessageService.success(message, 'Acompanhamentos');
        this.saved.emit(FollowUpMapper.toModel(response));
    }

    private onError(error: HttpErrorResponse): void {
        this.toastMessageService.error(error.error?.detail || 'Ocorreu um erro ao salvar o acompanhamento.', 'Acompanhamentos');
    }

    private patchForm(): void {
        if (!this.form) {
            return;
        }
        if (!this.followUp) {
            this.resetForm();
            this.updateNextDateControl(false);
            return;
        }
        this.form.patchValue(this.followUp);
        this.updateNextDateControl(this.followUp.requiresFollowUp);
    }

    private resetForm(): void {
        this.form.reset(new FollowUpModel({
            personId: this.personId,
            personName: this.personName,
            date: this.today()
        }));
    }

    private updateNextDateControl(requiresFollowUp: boolean): void {
        const control = this.form.get('nextFollowUpDate')!;
        if (requiresFollowUp) {
            control.enable({ emitEvent: false });
            control.setValidators(Validators.required);
        } else {
            control.reset(null, { emitEvent: false });
            control.clearValidators();
            control.disable({ emitEvent: false });
        }
        control.updateValueAndValidity({ emitEvent: false });
    }

    private today(): string {
        return new Date().toISOString().slice(0, 10);
    }
}
