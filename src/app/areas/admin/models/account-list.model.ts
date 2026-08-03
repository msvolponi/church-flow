import { Role } from '@/app/shared/enums/role';

export class AccountListModel {
    id: number = 0;
    name: string = '';
    email: string = '';
    role: Role = Role.ADMIN;

    constructor(init?: Partial<AccountListModel>) {
        Object.assign(this, init);
    }
}