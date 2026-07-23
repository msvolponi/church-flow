import { ErrorCode } from '@/app/core/enums/error-codes';
import { AuthService } from '@/app/core/services/auth.service';
import { AppFloatingConfigurator } from '@/app/layout/component/app.floatingconfigurator';
import { ApiErrorResponse } from '@/app/shared/dtos/api-error.response';
import { LoginRequest } from '@/app/shared/dtos/login.request';
import { LoginResponse } from '@/app/shared/dtos/login.response';
import { Validator } from '@/app/shared/pages/notfound/components/validator/validator';
import { ValidatorService } from '@/app/shared/pages/notfound/components/validator/validator.service';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from 'node_modules/@angular/common/types/_module-chunk';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterModule,
    RippleModule,
    FluidModule,
    CommonModule,
    Validator,
    AppFloatingConfigurator
  ],
  templateUrl: './account-login.html',
  styleUrl: './account-login.scss',
})
export class AccountLogin {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService,
    private toastMessageService: ToastMessageService,
    private router: Router,
  ) {
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rememberMe: [false],
    });
  }

  isValidField(field: string, type: string): boolean {
    return this.validatorService.isValidField(this.loginForm, field, type);
  }

  login(): void {
    if (!this.validatorService.validate(this.loginForm)) {
      return;
    }

    const request: LoginRequest = this.loginForm.getRawValue();

    this.authService.login(request).subscribe({
      next: response => this.onLoginSuccess(response),
      error: (err: HttpErrorResponse) => this.onLoginError(err)
    });
  }

  private onLoginError(err: HttpErrorResponse): void {
    const errorResponse = err.error as ApiErrorResponse;
    
    switch (errorResponse.type) {
      case ErrorCode.INVALID_CREDENTIALS:
      case ErrorCode.NOT_FOUND:
        this.toastMessageService.error('Usuário ou senha inválidos.', 'Autenticação');
        break;
      default:
        break;
    }
  }

  private onLoginSuccess(response: LoginResponse): void {
    const rememberMe = this.loginForm.get('rememberMe')?.value ?? false;
    this.authService.saveToken(response, rememberMe);
    this.toastMessageService.success('Login realizado com sucesso.', 'Autenticação');
    this.router.navigate(['/admin']);
  }
}
