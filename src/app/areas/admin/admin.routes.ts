import { Routes } from '@angular/router';
import { Admin } from './admin';
import { Members } from './pages/members/members';
import { AccountRegister } from './pages/account/register/account-register';

export const adminRoutes: Routes = [
    {
        path: '',
        component: Admin,
        children: [
            { path: 'members', component: Members },
            { path: 'account/register', component: AccountRegister },
        ]
    }
];
