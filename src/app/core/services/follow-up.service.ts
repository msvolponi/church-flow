import { FollowUpRequest } from '@/app/shared/dtos/follow-up.request';
import { FollowUpResponse } from '@/app/shared/dtos/follow-up.response';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class FollowUpService {
    constructor(private api: ApiService) { }

        listByPerson(personId: number): Observable<FollowUpResponse[]> {
        return this.api
            .get<ApiResponse<FollowUpResponse[]>>(`follow-ups/person/${personId}`)
            .pipe(map(response => response.data ?? []));
    }

        find(id: number): Observable<FollowUpResponse> {
        return this.api
            .get<ApiResponse<FollowUpResponse>>(`follow-ups/${id}`)
            .pipe(map(response => response.data));
    }

        create(request: FollowUpRequest): Observable<FollowUpResponse> {
        return this.api
            .post<ApiResponse<FollowUpResponse>, FollowUpRequest>('follow-ups', request)
            .pipe(map(response => response.data));
    }

        update(id: number, request: FollowUpRequest): Observable<FollowUpResponse> {
        return this.api
            .put<ApiResponse<FollowUpResponse>, FollowUpRequest>(`follow-ups/${id}`, request)
            .pipe(map(response => response.data));
    }

    delete(id: number): Observable<void> {
        return this.api.delete<void>(`follow-ups/${id}`);
    }
}
