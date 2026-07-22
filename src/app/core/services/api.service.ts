import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(private http: HttpClient) { }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${environment.apiUrl}/${endpoint}`);
    }

    post<T, TBody>(endpoint: string, body: TBody): Observable<T> {
        return this.http.post<T>(`${environment.apiUrl}/${endpoint}`, body);
    }

    put<T, TBody>(endpoint: string, body: TBody): Observable<T> {
        return this.http.put<T>(`${environment.apiUrl}/${endpoint}`, body);
    }

    patch<T, TBody>(endpoint: string, body: TBody): Observable<T> {
        return this.http.patch<T>(`${environment.apiUrl}/${endpoint}`, body);
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${environment.apiUrl}/${endpoint}`);
    }
}