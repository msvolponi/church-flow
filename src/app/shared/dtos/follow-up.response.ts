import { FollowUpReason } from '@/app/shared/enums/follow-up-reason';
import { FollowUpType } from '@/app/shared/enums/follow-up-type';

export interface FollowUpResponse {
    id: number;
    personId: number;
    personName: string;
    responsibleId: number;
    responsibleName: string;
    date: string;
    type: FollowUpType;
    typeLabel: string;
    reason: FollowUpReason;
    reasonLabel: string;
    location: string;
    description: string;
    requiresFollowUp: boolean;
    nextFollowUpDate: string | null;
    createdAt: string;
    updatedAt: string;
}
