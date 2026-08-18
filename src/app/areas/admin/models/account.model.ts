import { Role, RoleOptions } from '@/app/shared/enums/role';
import { EnumHelper } from '@/app/shared/helpers/enum.helper';

export class AccountModel {

    id?: number;
    name: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    role: Role = Role.ADMIN;

    constructor(init?: Partial<AccountModel>) {
        Object.assign(this, init);
    }

    get roleLabel(): string {
        return EnumHelper.getEnumLabel(
            RoleOptions.OPTIONS,
            this.role
        );
    }
}