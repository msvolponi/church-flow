import { MemberType } from '@/app/shared/enums/member-type';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from "primeng/confirmdialog";
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { PersonListModel } from '../../../models/person-list.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToolbarModule, ConfirmDialog],
  providers: [ConfirmationService],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
})
export class PersonList {

  people = signal<PersonListModel[]>([
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
  edit = new EventEmitter<PersonListModel>();

  onEdit(member: PersonListModel): void {
    this.edit.emit(member);
  }

  onDelete(member: PersonListModel): void {
  }
}
