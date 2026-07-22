import { CreateUserRequest } from "@/app/shared/dtos/create-user.request";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { ApiService } from "./api.service";
import { CreateUserResponse } from "@/app/shared/dtos/create-user.response";

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private api: ApiService) { }

    // get(): Observable<UserDTO> {
    //     return this.api
    //         .get<ApiResponse<UserDTO>>('users')
    //         .pipe(map(response => response.data));
    // }

    // exists(): Observable<boolean> {
    //     return this.api
    //         .get<ApiResponse<ExistsDTO>>('users/exists')
    //         .pipe(map(response => response.data.exists));
    // }

    create(request: CreateUserRequest): Observable<CreateUserResponse> {
        return this.api
            .post<ApiResponse<CreateUserResponse>, CreateUserRequest>('users', request)
            .pipe(map(response => response.data));
    }
}