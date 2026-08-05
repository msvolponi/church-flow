import { Component, ViewChild } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { MemberListModel } from '../../models/member-list.model';
import { MemberList } from './list/member-list';
import { MemberForm } from './register/member-form';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [DialogModule, MemberList, MemberForm, ToolbarModule, ButtonModule],
  templateUrl: './members-page.html',
  styleUrl: './members-page.scss',
})
export class Members {

  @ViewChild(MemberList)
  private memberList!: MemberList;

  dialog = false;

  selected: MemberListModel | null = null;

  onCreate(): void {

    this.selected = null;
    this.dialog = true;
  }

  onEdit(member: MemberListModel): void {

    this.selected = member;
    this.dialog = true;
  }

  onSaved(): void {

    this.dialog = false;
    //this.memberList.reload();
  }
}
