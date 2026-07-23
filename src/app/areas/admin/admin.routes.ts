import { Routes } from '@angular/router';
import { Admin } from './admin';
import { AccountRegister } from './pages/account/register/account-register';
import { Members } from './pages/members/members';
import { roleGuard } from '@/app/core/guards/admin-role.guard';
import { Role } from '@/app/shared/enums/role';

export const adminRoutes: Routes = [
    {
        path: '',
        component: Admin,
        children: [
            { path: 'members', component: Members },
            { path: 'account/register', component: AccountRegister, canActivate: [roleGuard([Role.ADMIN, Role.MANAGER])] }
        ]
    }
];
