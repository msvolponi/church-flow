import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest } from '@/app/shared/dtos/login.request';
import { LoginResponse } from '@/app/shared/dtos/login.response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.api.post<LoginResponse, LoginRequest>('auth/login', request);
  }

  saveToken(response: LoginResponse, rememberMe = true): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('auth_token', response.token);
    storage.setItem('auth_type', response.type || 'Bearer');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token') ?? sessionStorage.getItem('auth_token');
  }

  getTokenType(): string {
    return localStorage.getItem('auth_type') ?? sessionStorage.getItem('auth_type') ?? 'Bearer';
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_type');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_type');
  }
}
