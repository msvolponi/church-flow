import { Component, ViewChild } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { AccountUserList } from '../../models/account-user.list';
import { AccountList } from './list/account-list';
import { AccountForm } from './register/account-form';

@Component({
    selector: 'app-account-page',
    standalone: true,
    imports: [
        ToolbarModule,
        ButtonModule,
        DialogModule,
        AccountList,
        AccountForm
    ],
    templateUrl: './account-page.html'
})
export class AccountPage {

    @ViewChild(AccountList)
    private accountList!: AccountList;

    userDialog = false;

    selectedUser: AccountUserList | null = null;

    new(): void {

        this.selectedUser = null;

        this.userDialog = true;
    }

    onEdit(user: AccountUserList): void {

        this.selectedUser = user;

        this.userDialog = true;
    }

    onSaved(): void {

        this.userDialog = false;

        this.accountList.reload();
    }

}