import { Role } from '@/app/shared/enums/role';

export class AccountFormModel {

    id: number | undefined = undefined;
    name: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    role: Role = Role.ADMIN;

    constructor(init?: Partial<AccountFormModel>) {
        Object.assign(this, init);
    }
}