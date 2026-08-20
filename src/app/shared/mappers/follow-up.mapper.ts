import { FollowUpModel } from '@/app/areas/admin/models/follow-up.model';
import { FollowUpRequest } from '@/app/shared/dtos/follow-up.request';
import { FollowUpResponse } from '@/app/shared/dtos/follow-up.response';

export class FollowUpMapper {
    static toModel(response: FollowUpResponse): FollowUpModel {
        return new FollowUpModel({
            id: response.id,
            personId: response.personId,
            personName: response.personName,
            responsibleId: response.responsibleId,
            responsibleName: response.responsibleName,
            date: response.date,
            type: response.type,
            typeLabel: response.typeLabel,
            reason: response.reason,
            reasonLabel: response.reasonLabel,
            location: response.location,
            description: response.description,
            requiresFollowUp: response.requiresFollowUp,
            nextFollowUpDate: response.nextFollowUpDate,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt
        });
    }

    static toRequest(model: FollowUpModel): FollowUpRequest {
        return {
            personId: model.personId!,
            responsibleId: model.responsibleId!,
            date: model.date,
            type: model.type,
            reason: model.reason,
            location: model.location,
            description: model.description,
            requiresFollowUp: model.requiresFollowUp,
            nextFollowUpDate: model.requiresFollowUp ? model.nextFollowUpDate : null
        };
    }
}
