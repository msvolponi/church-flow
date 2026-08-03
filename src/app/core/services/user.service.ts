import { AccountUserList } from "@/app/areas/admin/models/account-user.list";
import { AccountRequest } from "@/app/shared/dtos/user.request";
import { AccountResponse } from "@/app/shared/dtos/user.response";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private api: ApiService) { }

    list(): Observable<AccountUserList[]> {
        return this.api
            .get<ApiResponse<AccountUserList[]>>('users')
            .pipe(map(response => response.data));
    }

    // exists(): Observable<boolean> {
    //     return this.api
    //         .get<ApiResponse<ExistsDTO>>('users/exists')
    //         .pipe(map(response => response.data.exists));
    // }

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