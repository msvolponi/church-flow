import { BaptismStatus } from '@/app/shared/enums/baptism-status';
import { Gender } from '@/app/shared/enums/gender';
import { MaritalStatus } from '@/app/shared/enums/marital-status';
import { MemberType } from '@/app/shared/enums/member-type';

export class PersonFormModel {
    id: number | undefined = undefined;
    fullName: string = '';
    memberType: MemberType = MemberType.VISITOR;
    gender: Gender | '' = '';
    birthDate: string = '';
    maritalStatus: MaritalStatus | '' = '';
    cellphone: string = '';
    phone: string = '';
    email: string = '';
    zipCode: string = '';
    street: string = '';
    number: string = '';
    complement: string = '';
    neighborhood: string = '';
    city: string = '';
    state: string = '';
    memberSince: string = '';
    baptizedInWater: BaptismStatus = BaptismStatus.NO;
    profession: string = '';
    observations: string = '';

    constructor(init?: Partial<PersonFormModel>) {
        Object.assign(this, init);
    }
}
