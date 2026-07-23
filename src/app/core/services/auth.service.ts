import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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

  refreshSession(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('Refresh token not found'));
    }

    return this.api.post<LoginResponse, { refreshToken: string }>('auth/refresh', {
      refreshToken,
    });
  }

  saveToken(response: LoginResponse, rememberMe = true): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    if (rememberMe) {
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('auth_refresh_token');
      sessionStorage.removeItem('auth_type');
      sessionStorage.removeItem('auth_storage_scope');
    } else {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_refresh_token');
      localStorage.removeItem('auth_type');
      localStorage.removeItem('auth_storage_scope');
    }

    storage.setItem('auth_token', response.token);
    storage.setItem('auth_refresh_token', response.refreshToken);
    storage.setItem('auth_type', response.type || 'Bearer');
    storage.setItem('auth_storage_scope', rememberMe ? 'local' : 'session');
  }

  getToken(): string | null {
    return this.getPreferredStorage().getItem('auth_token');
  }

  getRefreshToken(): string | null {
    return this.getPreferredStorage().getItem('auth_refresh_token');
  }

  hasRefreshToken(): boolean {
    return !!this.getRefreshToken();
  }

  isRemembered(): boolean {
    return this.getStorageScope() === 'local';
  }

  getTokenType(): string {
    return this.getPreferredStorage().getItem('auth_type') ?? 'Bearer';
  }

  private getPreferredStorage(): Storage {
    return this.getStorageScope() === 'local' ? localStorage : sessionStorage;
  }

  private getStorageScope(): 'local' | 'session' {
    const sessionScope = sessionStorage.getItem('auth_storage_scope');
    if (sessionScope === 'session') {
      return 'session';
    }

    const localScope = localStorage.getItem('auth_storage_scope');
    return localScope === 'local' ? 'local' : 'session';
  }

  getPayload(): { role?: string; name?: string; email?: string; exp?: number } | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payloadBase64 = token.split('.')[1] ?? '';
      const normalizedPayload = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const paddedPayload = normalizedPayload.padEnd(normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4), '=');
      const payload = JSON.parse(atob(paddedPayload)) as { role?: string; name?: string; email?: string; exp?: number };
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
    localStorage.removeItem('auth_refresh_token');
    localStorage.removeItem('auth_type');
    localStorage.removeItem('auth_storage_scope');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_refresh_token');
    sessionStorage.removeItem('auth_type');
    sessionStorage.removeItem('auth_storage_scope');
  }
}
