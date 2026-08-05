import { MemberType } from '@/app/shared/enums/member-type';

export class MemberListModel {
    id: number | undefined = undefined;
    fullName: string = '';
    memberType: MemberType = MemberType.VISITOR;
    email: string = '';
    cellphone: string = '';

    constructor(init?: Partial<MemberListModel>) {
        Object.assign(this, init);
    }
}
