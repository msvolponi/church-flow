import { ErrorCode } from "@/app/core/enums/error-codes";
import { AuthService } from "@/app/core/services/auth.service";
import { UserService } from "@/app/core/services/user.service";
import { ApiErrorResponse } from "@/app/shared/dtos/api-error.response";
import { CreateUserRequest } from "@/app/shared/dtos/create-user.request";
import { CreateUserResponse } from "@/app/shared/dtos/create-user.response";
import { Role, RoleOptions } from "@/app/shared/enums/role";
import { AccountMapper } from "@/app/shared/mappers/account.mapper";
import { Validator } from "@/app/shared/pages/notfound/components/validator/validator";
import { ValidatorService } from '@/app/shared/pages/notfound/components/validator/validator.service';
import { ToastMessageService } from "@/app/shared/services/toast-message.service";
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from "node_modules/@angular/common/types/_module-chunk";
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AccountRegisterForm } from '../../../models/account-register.form';
import { AccountUserList } from "../../../models/account-user.list";

@Component({
  selector: 'app-account-register',
  standalone: true,
  imports: [InputTextModule, FluidModule, ButtonModule, ReactiveFormsModule, CommonModule, Validator, SelectModule],
  templateUrl: './account-register.html',
  styleUrl: './account-register.scss'
})
export class AccountRegister implements OnChanges {
  @Input()
  user: AccountUserList | null = null;

  @Output()
  save = new EventEmitter<CreateUserResponse>();

  registerForm = new AccountRegisterForm();
  form: FormGroup;
  roles = RoleOptions.OPTIONS;

  constructor(private fb: FormBuilder, private validatorService: ValidatorService,
    private toastMessageService: ToastMessageService, private userService: UserService, private authService: AuthService) {
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

  ngOnChanges(changes: SimpleChanges): void {

    if (!changes['user']) {
      return;
    }

    if (this.user == null) {
      this.resetForm();
      return;
    }

    this.form.patchValue(this.user);
  }

  ngOnInit(): void {
    this.applySecurityRole();
  }

  private applySecurityRole() {
    if (this.authService.getRole() != Role.ADMIN) {
      this.roles = this.roles.filter(role => role.value !== Role.ADMIN);
      this.form.patchValue({ role: Role.MANAGER });
    }
  }

  isValidField(field: string, type: string): boolean {
    return this.validatorService.isValidField(this.form, field, type);
  }

  onSave(): void {
    if (!this.validatorService.validate(this.form)) {
      return;
    }

    const form = new AccountRegisterForm(this.form.getRawValue());
    const request: CreateUserRequest = AccountMapper.toCreateRequest(form);

    this.userService.create(request).subscribe({
      next: (response: CreateUserResponse) => this.onRegisterSuccess(response),
      error: (err: HttpErrorResponse) => this.onRegisterError(err)
    });
  }

  private onRegisterError(err: HttpErrorResponse): void {
    const errorResponse = err.error as ApiErrorResponse;
    switch (errorResponse.type) {
      case ErrorCode.ALREADY_USED:
        this.toastMessageService.error('O e-mail informado já está em uso.', 'Cadastro de usuário');
        break;
      case ErrorCode.INVALID_VALUE:
        this.toastMessageService.error('Os dados informados são inválidos.', 'Cadastro de usuário');
        break;
      default:
        break;
    }
  }

  private onRegisterSuccess(response: CreateUserResponse): void {
    this.toastMessageService.success('Usuário cadastrado com sucesso.', 'Cadastro de usuário');
    this.save.emit(response);
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset(new AccountRegisterForm());
    this.applySecurityRole();
  }
}
