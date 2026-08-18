import { ErrorCode } from '@/app/core/enums/error-codes';
import { PersonService } from '@/app/core/services/person.service';
import { ApiErrorResponse } from '@/app/shared/dtos/api-error.response';
import { PersonRequest } from '@/app/shared/dtos/person.request';
import { PersonResponse } from '@/app/shared/dtos/person.response';
import { GenderOptions } from '@/app/shared/enums/gender';
import { MaritalStatusOptions } from '@/app/shared/enums/marital-status';
import { MemberType, MemberTypeOptions } from '@/app/shared/enums/member-type';
import { PersonMapper } from '@/app/shared/mappers/person.mapper';
import { Validator } from "@/app/shared/pages/components/validator/validator";
import { ValidatorService } from '@/app/shared/pages/components/validator/validator.service';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FieldsetModule } from 'primeng/fieldset';
import { FluidModule } from 'primeng/fluid';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { PersonModel } from '../../../models/person.model';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, TextareaModule, ButtonModule, FieldsetModule, FluidModule, InputMaskModule, Validator, CheckboxModule],
  templateUrl: './person-form.html',
  styleUrl: './person-form.scss',
})
export class PersonForm {
  @Input()
  person: PersonModel | null = null;

  @Output()
  save = new EventEmitter<PersonResponse>();

  memberTypes = MemberTypeOptions.OPTIONS;
  genders = GenderOptions.OPTIONS;
  maritalStatuses = MaritalStatusOptions.OPTIONS;

  registerForm = new PersonModel();
  form: FormGroup;

  constructor(private fb: FormBuilder, private validatorService: ValidatorService,
    private personService: PersonService,
    private toastMessageService: ToastMessageService) {

    this.form = this.fb.group({
      id: [null],
      fullName: ['', Validators.required],
      memberType: [MemberType.VISITOR],
      gender: [''],
      birthDate: [''],
      maritalStatus: [''],
      cellphone: [''],
      phone: [''],
      email: [''],
      zipCode: [''],
      street: [''],
      number: [''],
      complement: [''],
      neighborhood: [''],
      city: [''],
      state: [''],
      memberSince: [''],
      baptizedInWater: [false],
      profession: [''],
      observations: [''],
    });

    this.form.patchValue(this.registerForm);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!changes['person']) {
      return;
    }

    if (this.person == null) {
      this.resetForm();
      return;
    }

    this.form.patchValue(this.person);
  }


  private resetForm(): void {
    this.form.reset(new PersonModel());
  }

  isValidField(field: string, type: string): boolean {
    return this.validatorService.isValidField(this.form, field, type);
  }


  onSave(): void {
    if (!this.validatorService.validate(this.form)) {
      return;
    }

    const form = new PersonModel(this.form.getRawValue());
    const request: PersonRequest = PersonMapper.toRequest(form);

    if (this.person) {
      this.personService.update(request).subscribe({
        next: (response: PersonResponse) => this.onSaveSuccess(response),
        error: (err: HttpErrorResponse) => this.onSaveError(err)
      });
    } else {
      this.personService.create(request).subscribe({
        next: (response: PersonResponse) => this.onSaveSuccess(response),
        error: (err: HttpErrorResponse) => this.onSaveError(err)
      });
    }

  }

  private onSaveError(err: HttpErrorResponse): void {
    const errorResponse = err.error as ApiErrorResponse;
    switch (errorResponse.type) {
      case ErrorCode.NOT_FOUND:
        this.toastMessageService.error('Pessoa informada não foi encontrada.', 'Cadastro de pessoa');
        break;
      default:
        this.toastMessageService.error('Ocorreu um erro ao salvar a pessoa.', 'Cadastro de pessoa');
        break;
    }
  }

  private onSaveSuccess(response: PersonResponse): void {
    if (this.person) {
      this.toastMessageService.success('Pessoa atualizada com sucesso.', 'Atualização de pessoa');
    } else {
      this.toastMessageService.success('Pessoa cadastrada com sucesso.', 'Cadastro de pessoa');
    }

    this.save.emit(response);
    this.resetForm();
  }
}
