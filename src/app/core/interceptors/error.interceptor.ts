import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

import { ApiErrorResponse } from '@/app/shared/dtos/api-error.response';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private readonly toastMessageService: ToastMessageService,
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    intercept(
        req: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {

        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                const error = err.error as ApiErrorResponse;

                switch (err.status) {

                    case 0:
                        this.toastMessageService.error(
                            'Não foi possível conectar ao servidor.',
                            'Erro de conexão'
                        );
                        break;

                    case 401:
                        this.authService.logout();
                        this.router.navigate(['/login']);
                        this.toastMessageService.warn(
                            'Sua sessão expirou.',
                            'Sessão expirada'
                        );
                        break;

                    case 403:
                        this.toastMessageService.error(
                            'Você não possui permissão para realizar esta operação.',
                            'Acesso negado'
                        );
                        break;

                    case 500:
                        this.toastMessageService.error(
                            error?.detail ?? 'Erro interno do servidor.',
                            'Erro interno'
                        );
                        break;

                    case 503:
                        this.toastMessageService.error(
                            'Serviço temporariamente indisponível.',
                            'Serviço indisponível'
                        );
                        break;
                }

                return throwError(() => err);
            })
        );
    }
}