import { roleGuard } from '@/app/core/guards/admin-role.guard';
import { Role } from '@/app/shared/enums/role';
import { Routes } from '@angular/router';
import { Admin } from './admin';
import { AccountForm as AccountForm } from './pages/account/register/account-form';
import { PersonPage } from './pages/person/person-page';
import { AccountPage } from './pages/account/account-page';
import { AdminDashboard } from './pages/dashboard/dashboard';
import { FollowUpPage } from './pages/follow-up/follow-up-page';

export const adminRoutes: Routes = [
    {
        path: '',
        component: Admin,
        children: [
            { path: 'dashboard', component: AdminDashboard },
            { path: 'person/:id/follow-ups', component: FollowUpPage },
            { path: 'person/list', component: PersonPage },
            { path: 'account/list', component: AccountPage, canActivate: [roleGuard([Role.ADMIN, Role.MANAGER])] }
        ]
    }
];
