import { Routes } from '@angular/router';
import { adminRoutes } from './app/areas/admin/admin.routes';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { AccountLogin } from './app/shared/pages/account/login/account-login';
import { Notfound } from './app/shared/pages/notfound/notfound';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'admin', children: adminRoutes },
    { path: 'login', component: AccountLogin },

    {
        path: 'sakai',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'sakai/landing', component: Landing },
    { path: 'sakai/auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' },
];
