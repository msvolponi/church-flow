import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

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
    myModel: MenuItem[] = [];

    ngOnInit() {
        this.myModel = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard']
                    }
                ]
            },
            {
                label: 'Pessoas',
                items: [
                    {
                        label: 'Membros',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/pessoa/list']
                    },
                    {
                        label: 'Novo membro',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: ['/pessoa/new']
                    },
                    {
                        label: 'Aniversariantes',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pessoa/birthdays']
                    }
                ]
            },
            {
                label: 'Relacionamento',
                items: [
                    {
                        label: 'Histórico',
                        icon: 'pi pi-fw pi-history',
                        routerLink: ['/follow-up/history']
                    },
                    {
                        label: 'Visitas',
                        icon: 'pi pi-fw pi-map-marker',
                        routerLink: ['/follow-up/visits']
                    },
                    {
                        label: 'Acompanhamentos',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/follow-up']
                    }
                ]
            },
            {
                label: 'Ministérios',
                items: [
                    {
                        label: 'Ministérios',
                        icon: 'pi pi-fw pi-sitemap',
                        routerLink: ['/ministries']
                    },
                    {
                        label: 'Líderes',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/leaders']
                    }
                ]
            },
            {
                label: 'Eventos',
                items: [
                    {
                        label: 'Agenda',
                        icon: 'pi pi-fw pi-calendar-plus',
                        routerLink: ['/events']
                    },
                    {
                        label: 'Eventos',
                        icon: 'pi pi-fw pi-star',
                        routerLink: ['/events/list']
                    }
                ]
            },
            {
                label: 'Relatórios',
                items: [
                    {
                        label: 'Indicadores',
                        icon: 'pi pi-fw pi-chart-bar',
                        routerLink: ['/reports']
                    }
                ]
            },
            {
                label: 'Configurações',
                items: [
                    {
                        label: 'Usuários',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['/users']
                    },
                    {
                        label: 'Permissões',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['/permissions']
                    },
                    {
                        label: 'Configurações gerais',
                        icon: 'pi pi-fw pi-cog',
                        routerLink: ['/settings']
                    }
                ]
            }
        ];


        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/sakai'] }]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/sakai/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/sakai/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/sakai/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/sakai/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/sakai/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/sakai/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/sakai/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/sakai/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/sakai/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/sakai/uikit/menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/sakai/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/sakai/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/sakai/uikit/charts'] },
                    { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/sakai/uikit/timeline'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/sakai/uikit/misc'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                path: '/sakai/pages',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/sakai/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        path: '/sakai/auth',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/sakai/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/sakai/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/sakai/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/sakai/pages/crud']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/sakai/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/sakai/pages/empty']
                    }
                ]
            },
            {
                label: 'Hierarchy',
                path: '/sakai/hierarchy',
                items: [
                    {
                        label: 'Submenu 1',
                        icon: 'pi pi-fw pi-bookmark',
                        path: '/sakai/hierarchy/submenu_1',
                        items: [
                            {
                                label: 'Submenu 1.1',
                                icon: 'pi pi-fw pi-bookmark',
                                path: '/sakai/hierarchy/submenu_1/submenu_1_1',
                                items: [
                                    { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 1.2',
                                icon: 'pi pi-fw pi-bookmark',
                                path: '/sakai/hierarchy/submenu_1/submenu_1_2',
                                items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    },
                    {
                        label: 'Submenu 2',
                        icon: 'pi pi-fw pi-bookmark',
                        path: '/sakai/hierarchy/submenu_2',
                        items: [
                            {
                                label: 'Submenu 2.1',
                                icon: 'pi pi-fw pi-bookmark',
                                path: '/sakai/hierarchy/submenu_2/submenu_2_1',
                                items: [
                                    { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                    { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                ]
                            },
                            {
                                label: 'Submenu 2.2',
                                icon: 'pi pi-fw pi-bookmark',
                                path: '/sakai/hierarchy/submenu_2/submenu_2_2',
                                items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Get Started',
                items: [
                    {
                        label: 'Documentation',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/documentation']
                    },
                    {
                        label: 'View Source',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sakai-ng',
                        target: '_blank'
                    }
                ]
            }
        ];
    }
}
