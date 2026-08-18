import { Role } from '@/app/shared/enums/role';

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
}