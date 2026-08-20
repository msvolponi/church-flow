import { FollowUpReason } from '@/app/shared/enums/follow-up-reason';
import { FollowUpType } from '@/app/shared/enums/follow-up-type';

export class FollowUpModel {
    id?: number;
    personId: number | null = null;
    personName: string = '';
    responsibleId: number | null = null;
    responsibleName: string = '';
    date: string = '';
    type: FollowUpType = FollowUpType.VISIT;
    typeLabel: string = '';
    reason: FollowUpReason = FollowUpReason.FOLLOW_UP;
    reasonLabel: string = '';
    location: string = '';
    description: string = '';
    requiresFollowUp: boolean = false;
    nextFollowUpDate: string | null = null;
    createdAt?: string;
    updatedAt?: string;

    constructor(init?: Partial<FollowUpModel>) {
        Object.assign(this, init);
    }
}
