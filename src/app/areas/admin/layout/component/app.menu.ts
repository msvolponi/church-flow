import { AppMenuitem } from '@/app/layout/component/app.menuitem';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
    <ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul> `,
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin/dashboard']
                    }
                ]
            },
            {
                label: 'Pessoas',
                items: [
                    {
                        label: 'Membros',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/admin/members']
                    },
                    {
                        label: 'Novo membro',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/admin/members/new']
                    },
                    {
                        label: 'Aniversariantes',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/admin/members/birthdays']
                    }
                ]
            },
            {
                label: 'Relacionamento',
                items: [
                    {
                        label: 'Histórico',
                        icon: 'pi pi-fw pi-history',
                        routerLink: ['/admin/follow-up/history']
                    },
                    {
                        label: 'Visitas',
                        icon: 'pi pi-fw pi-map-marker',
                        routerLink: ['/admin/follow-up/visits']
                    },
                    {
                        label: 'Acompanhamentos',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/admin/follow-up']
                    }
                ]
            },
            {
                label: 'Ministérios',
                items: [
                    {
                        label: 'Ministérios',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: ['/admin/ministries']
                    },
                    {
                        label: 'Líderes',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/admin/leaders']
                    }
                ]
            },
            {
                label: 'Eventos',
                items: [
                    {
                        label: 'Agenda',
                        icon: 'pi pi-fw pi-calendar-plus',
                        routerLink: ['/admin/events']
                    },
                    {
                        label: 'Eventos',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['/admin/events/list']
                    }
                ]
            },
            {
                label: 'Relatórios',
                items: [
                    {
                        label: 'Indicadores',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/admin/reports']
                    }
                ]
            },
            {
                label: 'Configurações',
                items: [
                    {
                        label: 'Usuários',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['/admin/users']
                    },
                    {
                        label: 'Permissões',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['/admin/permissions']
                    },
                    {
                        label: 'Configurações gerais',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['/admin/settings']
                    }
                ]
            }
        ];
    }
}
