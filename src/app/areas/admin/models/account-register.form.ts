import { Role } from '@/app/shared/enums/role';

export class AccountRegisterForm {

    name: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    role: Role = Role.ADMIN;

    constructor(init?: Partial<AccountRegisterForm>) {
        Object.assign(this, init);
    }
}