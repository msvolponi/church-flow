import { AccountModel } from "@/app/areas/admin/models/account.model";
import { AccountRequest } from "@/app/shared/dtos/account.request";
import { AccountResponse } from "@/app/shared/dtos/account.response";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class AccountService {

    constructor(private api: ApiService) { }

    list(): Observable<AccountResponse[]> {
        return this.api
            .get<ApiResponse<AccountResponse[]>>('users')
            .pipe(map(response => response.data));
    }

    delete(id: number): Observable<void> {
        return this.api.delete<void>(`users/${id}`);
    }

    create(request: AccountRequest): Observable<AccountResponse> {
        return this.api
            .post<ApiResponse<AccountResponse>, AccountRequest>('users', request)
            .pipe(map(response => response.data));
    }

    update(request: AccountRequest): Observable<AccountResponse> {
        return this.api
            .put<ApiResponse<AccountResponse>, AccountRequest>('users', request)
            .pipe(map(response => response.data));
    }
}