import { MemberType } from '@/app/shared/enums/member-type';

export class PersonListModel {
    id: number = 0;
    fullName: string = '';
    memberType: MemberType = MemberType.VISITOR;
    email: string = '';
    cellphone: string = '';

    constructor(init?: Partial<PersonListModel>) {
        Object.assign(this, init);
    }
}
