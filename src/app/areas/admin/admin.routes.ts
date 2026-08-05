import { roleGuard } from '@/app/core/guards/admin-role.guard';
import { Role } from '@/app/shared/enums/role';
import { Routes } from '@angular/router';
import { Admin } from './admin';
import { AccountForm as AccountForm } from './pages/account/register/account-form';
import { Members } from './pages/members/members-page';
import { AccountPage } from './pages/account/account-page';

export const adminRoutes: Routes = [
    {
        path: '',
        component: Admin,
        children: [
            { path: 'members', component: Members },
            { path: 'account/register', component: AccountForm, canActivate: [roleGuard([Role.ADMIN, Role.MANAGER])] },
            { path: 'account/list', component: AccountPage, canActivate: [roleGuard([Role.ADMIN, Role.MANAGER])] }
        ]
    }
];
