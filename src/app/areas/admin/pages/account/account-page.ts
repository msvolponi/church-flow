import { Component, ViewChild } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { AccountListModel } from '../../models/account-list.model';
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

    dialog = false;

    selected: AccountListModel | null = null;

    onCreate(): void {

        this.selected = null;
        this.dialog = true;
    }

    onEdit(user: AccountListModel): void {

        this.selected = user;
        this.dialog = true;
    }

    onSaved(): void {

        this.dialog = false;
        this.accountList.reload();
    }

}