import { MemberType } from '@/app/shared/enums/member-type';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from "primeng/confirmdialog";
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MemberListModel } from '../../../models/member-list.model';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, ConfirmDialog],
  providers: [ConfirmationService],
  templateUrl: './member-list.html',
  styleUrl: './member-list.scss',
})
export class MemberList {

  members = signal<MemberListModel[]>([
    {
      id: 1,
      fullName: 'Maria Silva',
      memberType: MemberType.MEMBER,
      cellphone: '(11) 99999-0000',
      email: 'maria@email.com',
    },
    {
      id: 2,
      fullName: 'João Pereira',
      memberType: MemberType.ATTENDANT,
      cellphone: '(11) 98888-1111',
      email: 'joao@email.com',
    },
  ]);

  @Output()
  edit = new EventEmitter<MemberListModel>();

  onEdit(member: MemberListModel): void {
    this.edit.emit(member);
  }

  onDelete(member: MemberListModel): void {
  }
}
