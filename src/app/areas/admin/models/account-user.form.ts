import { Role } from '@/app/shared/enums/role';

export class AccountUserForm {

    id: number | undefined = undefined;
    name: string = '';
    email: string = '';
    password: string = '';
    confirmPassword: string = '';
    role: Role = Role.ADMIN;

    constructor(init?: Partial<AccountUserForm>) {
        Object.assign(this, init);
    }
}