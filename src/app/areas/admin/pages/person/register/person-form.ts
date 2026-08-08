import { GenderOptions } from '@/app/shared/enums/gender';
import { MaritalStatusOptions } from '@/app/shared/enums/marital-status';
import { MemberType, MemberTypeOptions } from '@/app/shared/enums/member-type';
import { Validator } from "@/app/shared/pages/components/validator/validator";
import { ValidatorService } from '@/app/shared/pages/components/validator/validator.service';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { FluidModule } from 'primeng/fluid';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { PersonFormModel } from '../../../models/person-form.model';
import { PersonListModel } from '../../../models/person-list.model';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, TextareaModule, ButtonModule, FieldsetModule, FluidModule, InputMaskModule, Validator, CheckboxModule],
  templateUrl: './person-form.html',
  styleUrl: './person-form.scss',
})
export class PersonForm {
  @Input()
  person: PersonListModel | null = null;

  @Output()
  save = new EventEmitter<void>();

  memberTypes = MemberTypeOptions.OPTIONS;
  genders = GenderOptions.OPTIONS;
  maritalStatuses = MaritalStatusOptions.OPTIONS;

  registerForm = new PersonFormModel();
  form: FormGroup;

  constructor(private fb: FormBuilder, private validatorService: ValidatorService) {
    this.form = this.fb.group({
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
    this.form.reset(new PersonFormModel());
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = new PersonFormModel(this.form.getRawValue());
    console.log(form);
    this.save.emit();
  }

  isValidField(field: string, type: string): boolean {
    return this.validatorService.isValidField(this.form, field, type);
  }


  onSave(): void {
    if (!this.validatorService.validate(this.form)) {
      return;
    }

    // const form = new MemberFormModel(this.form.getRawValue());
    // const request: MemberRequest = MemberMapper.toRequest(form);

    // if (this.member) {
    //   this.userService.update(request).subscribe({
    //     next: (response: MemberResponse) => this.onSaveSuccess(response),
    //     error: (err: HttpErrorResponse) => this.onSaveError(err)
    //   });
    // } else {
    //   this.userService.create(request).subscribe({
    //     next: (response: MemberResponse) => this.onSaveSuccess(response),
    //     error: (err: HttpErrorResponse) => this.onSaveError(err)
    //   });
    // }

  }
}
