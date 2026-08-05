import { BaptismStatus, BaptismStatusOptions } from '@/app/shared/enums/baptism-status';
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
import { MemberFormModel } from '../../../models/member-form.model';
import { MemberListModel } from '../../../models/member-list.model';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, TextareaModule, ButtonModule, FieldsetModule, FluidModule, InputMaskModule, Validator],
  templateUrl: './member-form.html',
  styleUrl: './member-form.scss',
})
export class MemberForm {
  @Input()
  member: MemberListModel | null = null;

  @Output()
  save = new EventEmitter<void>();

  memberTypes = MemberTypeOptions.OPTIONS;
  genders = GenderOptions.OPTIONS;
  maritalStatuses = MaritalStatusOptions.OPTIONS;
  baptizedOptions = BaptismStatusOptions.OPTIONS;

  registerForm = new MemberFormModel();
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
      baptizedInWater: [BaptismStatus.NO],
      profession: [''],
      observations: [''],
    });

    this.form.patchValue(this.registerForm);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!changes['member']) {
      return;
    }

    if (this.member == null) {
      this.resetForm();
      return;
    }

    this.form.patchValue(this.member);
  }


  private resetForm(): void {
    this.form.reset(new MemberFormModel());
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = new MemberFormModel(this.form.getRawValue());
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
