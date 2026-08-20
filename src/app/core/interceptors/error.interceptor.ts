import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, shareReplay, switchMap, tap, throwError } from 'rxjs';

import { ApiErrorResponse } from '@/app/shared/dtos/api-error.response';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '@/app/shared/dtos/login.response';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private refreshInProgress$: Observable<LoginResponse> | null = null;

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

                if (err.status === 401 && !req.url.includes('/auth/refresh') && !req.url.includes('/auth/login') && this.authService.hasRefreshToken()) {
                    if (!this.refreshInProgress$) {
                        this.refreshInProgress$ = this.authService.refreshSession().pipe(
                            tap(response => this.authService.saveToken(response, this.authService.isRemembered())),
                            finalize(() => this.refreshInProgress$ = null),
                            shareReplay({ bufferSize: 1, refCount: false })
                        );
                    }

                    return this.refreshInProgress$.pipe(
                        switchMap(response => next.handle(req.clone({
                            setHeaders: {
                                Authorization: `${response.type || 'Bearer'} ${response.token}`
                            }
                        }))),
                        catchError(() => {
                            this.authService.logout();
                            this.router.navigate(['/login']);
                            this.toastMessageService.warn(
                                'Sua sessão expirou.',
                                'Sessão expirada'
                            );
                            return throwError(() => err);
                        })
                    );
                }

                switch (err.status) {

                    case 0:
                        this.toastMessageService.error(
                            'Não foi possível conectar ao servidor.',
                            'Erro de conexão'
                        );
                        break;

                    case 401:
                        if (req.url.includes('/auth/login')) {
                            break;
                        }

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