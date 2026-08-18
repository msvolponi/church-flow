import { PersonModel } from "@/app/areas/admin/models/person.model";
import { PersonRequest } from "@/app/shared/dtos/person.request";
import { PersonResponse } from "@/app/shared/dtos/person.response";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { ApiService } from "./api.service";

@Injectable({ providedIn: 'root' })
export class PersonService {

    constructor(private api: ApiService) { }

    list(): Observable<PersonResponse[]> {
        return this.api
            .get<ApiResponse<PersonResponse[]>>('persons')
            .pipe(map(response => response.data));
    }

    delete(id: number): Observable<void> {
        return this.api.delete<void>(`persons/${id}`);
    }

    create(request: PersonRequest): Observable<PersonResponse> {
        return this.api
            .post<ApiResponse<PersonResponse>, PersonRequest>('persons', request)
            .pipe(map(response => response.data));
    }

    update(request: PersonRequest): Observable<PersonResponse> {
        debugger;
        return this.api
            .put<ApiResponse<PersonResponse>, PersonRequest>(`persons/${request.id}`, request)
            .pipe(map(response => response.data));
    }
}