import { EnumHelper } from '@/app/shared/helpers/enum.helper';
import { Gender } from '@/app/shared/enums/gender';
import { MaritalStatus } from '@/app/shared/enums/marital-status';
import { MemberType, MemberTypeOptions } from '@/app/shared/enums/member-type';
import { State } from '@/app/shared/enums/states';

export class PersonModel {
    id?: number;
    fullName: string = '';
    memberType: MemberType = MemberType.VISITOR;
    gender: Gender = Gender.OTHER;
    birthDate: string = '';
    maritalStatus: MaritalStatus | '' = '';
    spouseId?: number;
    cellphone: string = '';
    phone: string = '';
    email: string = '';
    zipCode: string = '';
    street: string = '';
    number: string = '';
    complement: string = '';
    neighborhood: string = '';
    city: string = '';
    state: State | '' = '';
    memberSince: string = '';
    baptizedInWater: boolean = false;
    baptismDate: string = '';
    profession: string = '';
    observations: string = '';

    constructor(init?: Partial<PersonModel>) {
        Object.assign(this, init);
    }

    get memberTypeLabel(): string {
        return EnumHelper.getEnumLabel(
            MemberTypeOptions.OPTIONS,
            this.memberType
        );
    }
}
