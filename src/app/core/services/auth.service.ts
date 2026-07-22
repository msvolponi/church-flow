import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest } from '@/app/shared/dtos/login.request';
import { LoginResponse } from '@/app/shared/dtos/login.response';
import { Role } from '@/app/shared/enums/role';

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

  getPayload(): { role?: string; name?: string; email?: string } | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payloadBase64 = token.split('.')[1] ?? '';
      const normalizedPayload = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const paddedPayload = normalizedPayload.padEnd(normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4), '=');
      const payload = JSON.parse(atob(paddedPayload)) as { role?: string; name?: string; email?: string };
      return payload;
    } catch {
      return null;
    }
  }

  getRole(): Role | null {
    return (this.getPayload()?.role as Role) ?? null;
  }

  getName(): string | null {
    return this.getPayload()?.name ?? null;
  }

  getEmail(): string | null {
    return this.getPayload()?.email ?? null;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_type');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_type');
  }
}
