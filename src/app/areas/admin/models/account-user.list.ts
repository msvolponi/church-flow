import { Role } from '@/app/shared/enums/role';

export class AccountUserList {
    id: number = 0;
    name: string = '';
    email: string = '';
    role: Role = Role.ADMIN;

    constructor(init?: Partial<AccountUserList>) {
        Object.assign(this, init);
    }
}