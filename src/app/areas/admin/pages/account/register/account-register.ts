import { RoleOptions } from "@/app/shared/enums/role";
import { Validator } from "@/app/shared/pages/notfound/components/validator/validator";
import { ValidatorService } from '@/app/shared/pages/notfound/components/validator/validator.service';
import { ToastMessageService } from "@/app/shared/services/toast-message.service";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AccountRegisterForm } from '../../../models/account-register.form';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [InputTextModule, FluidModule, ButtonModule, ReactiveFormsModule, CommonModule, Validator, SelectModule],
  templateUrl: './account-register.html',
  styleUrl: './account-register.scss'
})
export class AccountRegister {
  registerForm = new AccountRegisterForm();
  form: FormGroup;
  roles = RoleOptions.OPTIONS;

  constructor(private fb: FormBuilder, private validatorService: ValidatorService, private toastMessageService: ToastMessageService) {
    this.form = fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required]],
      role: [null, Validators.required]
    });

    this.form.patchValue(this.registerForm);
    this.form.addValidators(this.validatorService.matchFields('password', 'confirmPassword'));
  }

  isValidField(field: string, type: string): boolean {
    return this.validatorService.isValidField(this.form, field, type);
  }

  register(): void {
    if (!this.validatorService.validate(this.form)) {
      return;
    }

    this.registerForm = this.form.value;

    alert(this.registerForm.role)
    this.toastMessageService.success('Usuário cadastrado com sucesso.', 'Cadastro de usuário');

    this.registerForm = new AccountRegisterForm();
    this.form.reset(this.registerForm);
  }
}
