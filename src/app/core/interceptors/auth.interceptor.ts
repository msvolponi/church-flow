import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

    if (isAuthEndpoint) {
      return next.handle(req);
    }

    const token = this.authService.getToken();
    const tokenType = this.authService.getTokenType();

    if (!token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `${tokenType} ${token}`
      }
    });

    return next.handle(authReq);
  }
}
