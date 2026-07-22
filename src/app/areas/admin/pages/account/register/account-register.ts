import { UserService } from "@/app/core/services/user.service";
import { CreateUserRequest } from "@/app/shared/dtos/create-user.request";
import { CreateUserResponse } from "@/app/shared/dtos/create-user.response";
import { RoleOptions } from "@/app/shared/enums/role";
import { AccountMapper } from "@/app/shared/mappers/account.mapper";
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

  constructor(private fb: FormBuilder, private validatorService: ValidatorService,
    private toastMessageService: ToastMessageService, private userService: UserService) {
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

    const form = new AccountRegisterForm(this.form.getRawValue());
    const request: CreateUserRequest = AccountMapper.toCreateRequest(form);

    this.userService.create(request).subscribe({
      next: (response) => {
        this.onRegisterSuccess(response);
      },
      error: (error) =>
        this.toastMessageService.error(error.message, 'Erro ao cadastrar usuário')
    });
  }

  onRegisterSuccess(response: CreateUserResponse): void {
    this.toastMessageService.success('Usuário cadastrado com sucesso.', 'Cadastro de usuário');
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset(new AccountRegisterForm());
  }
}
