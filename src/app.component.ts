import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule, MessageModule],
    template: `
        <p-toast></p-toast>
        <router-outlet></router-outlet>
    `
})
export class AppComponent { }
