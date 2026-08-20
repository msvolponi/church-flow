import { FollowUpReason } from '@/app/shared/enums/follow-up-reason';
import { FollowUpType } from '@/app/shared/enums/follow-up-type';

export interface FollowUpRequest {
    personId: number;
    responsibleId: number;
    date: string;
    type: FollowUpType;
    reason: FollowUpReason;
    location: string;
    description: string;
    requiresFollowUp: boolean;
    nextFollowUpDate: string | null;
}
