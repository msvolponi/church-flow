import { Routes } from '@angular/router';
import { Admin } from './admin';
import { AccountRegister } from './pages/account/register/account-register';
import { Members } from './pages/members/members';

export const adminRoutes: Routes = [
    {
        path: '',
        component: Admin,
        children: [
            { path: 'members', component: Members },
            { path: 'account/register', component: AccountRegister }
        ]
    }
];
