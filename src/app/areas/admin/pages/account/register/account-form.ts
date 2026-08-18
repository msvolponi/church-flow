import { ErrorCode } from "@/app/core/enums/error-codes";
import { AuthService } from "@/app/core/services/auth.service";
import { AccountService } from "@/app/core/services/account.service";
import { ApiErrorResponse } from "@/app/shared/dtos/api-error.response";
import { AccountRequest } from "@/app/shared/dtos/account.request";
import { AccountResponse } from "@/app/shared/dtos/account.response";
import { Role, RoleOptions } from "@/app/shared/enums/role";
import { AccountMapper } from "@/app/shared/mappers/account.mapper";
import { Validator } from "@/app/shared/pages/components/validator/validator";
import { ValidatorService } from '@/app/shared/pages/components/validator/validator.service';
import { ToastMessageService } from "@/app/shared/services/toast-message.service";
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from "node_modules/@angular/common/types/_module-chunk";
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AccountModel } from '../../../models/account.model';
import { FieldsetModule } from "primeng/fieldset";

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [InputTextModule, FluidModule, ButtonModule, ReactiveFormsModule, Validator, SelectModule, FieldsetModule],
  templateUrl: './account-form.html',
  styleUrl: './account-form.scss'
})
export class AccountForm implements OnChanges {
  @Input()
  user: AccountModel | null = null;

  @Output()
  save = new EventEmitter<AccountResponse>();

  registerForm = new AccountModel();
  form: FormGroup;
  roles = RoleOptions.OPTIONS;
  private matchPasswordValidator;

  constructor(private fb: FormBuilder, private validatorService: ValidatorService,
    private toastMessageService: ToastMessageService, private accountService: AccountService, private authService: AuthService) {

    this.form = fb.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required]],
      role: [null, Validators.required]
    });

    this.matchPasswordValidator = this.validatorService.matchFields('password', 'confirmPassword');
    this.form.patchValue(this.registerForm);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!changes['user']) {
      return;
    }

    if (this.user == null) {
      this.resetForm();
      this.enablePasswordValidation();
      return;
    }


    this.disablePasswordValidation();
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

    const form = new AccountModel(this.form.getRawValue());
    const request: AccountRequest = AccountMapper.toRequest(form);

    if (this.user) {
      this.accountService.update(request).subscribe({
        next: (response: AccountResponse) => this.onSaveSuccess(response),
        error: (err: HttpErrorResponse) => this.onSaveError(err)
      });
    } else {
      this.accountService.create(request).subscribe({
        next: (response: AccountResponse) => this.onSaveSuccess(response),
        error: (err: HttpErrorResponse) => this.onSaveError(err)
      });
    }

  }

  private onSaveError(err: HttpErrorResponse): void {
    const errorResponse = err.error as ApiErrorResponse;
    switch (errorResponse.type) {
      case ErrorCode.ALREADY_USED:
        this.toastMessageService.error('O e-mail informado já está em uso.', 'Cadastro de usuário');
        break;
      case ErrorCode.INVALID_VALUE:
        this.toastMessageService.error('Os dados informados são inválidos.', 'Cadastro de usuário');
        break;
      case ErrorCode.NOT_FOUND:
        this.toastMessageService.error('O usuário informado não foi encontrado.', 'Cadastro de usuário');
        break;
      default:
        this.toastMessageService.error('Ocorreu um erro ao salvar o usuário.', 'Cadastro de usuário');
        break;
    }
  }

  private onSaveSuccess(response: AccountResponse): void {
    if (this.user) {
      this.toastMessageService.success('Usuário atualizado com sucesso.', 'Atualização de usuário');
    } else {
      this.toastMessageService.success('Usuário cadastrado com sucesso.', 'Cadastro de usuário');
    }

    this.save.emit(response);
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset(new AccountModel());
    this.applySecurityRole();
  }

  private enablePasswordValidation(): void {
    this.form.get('password')?.setValidators([Validators.required]);
    this.form.get('confirmPassword')?.setValidators([Validators.required]);

    this.form.addValidators(this.matchPasswordValidator);

    this.form.get('password')?.updateValueAndValidity();
    this.form.get('confirmPassword')?.updateValueAndValidity();
    this.form.updateValueAndValidity();
  }

  private disablePasswordValidation(): void {
    this.form.get('password')?.clearValidators();
    this.form.get('confirmPassword')?.clearValidators();

    this.form.get('password')?.updateValueAndValidity();
    this.form.get('confirmPassword')?.updateValueAndValidity();
    this.form.updateValueAndValidity();
  }
}
