import { UserService } from '@/app/core/services/user.service';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AccountListModel } from '../../../models/account-list.model';

@Component({
  selector: 'app-account-list',
  imports: [CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule],
  templateUrl: './account-list.html',
  styleUrl: './account-list.scss',
})

export class AccountList implements OnInit {

  users = signal<AccountListModel[]>([]);

  @Output()
  edit = new EventEmitter<AccountListModel>();

  constructor(
    private userService: UserService,
    private toast: ToastMessageService
  ) { }

  ngOnInit() {
    this.reload();
  }

  reload(): void {
    this.userService.list().subscribe({
      next: users => this.users.set(users),
      error: () => this.toast.error(
        'Erro ao carregar usuários',
        'Usuários')
    });
  }

  onEdit(user: AccountListModel): void {
    this.edit.emit(user);
  }

  onDelete(user: AccountListModel): void {
    this.userService.delete(user.id).subscribe({
      next: () => {
        this.users.update(list =>
          list.filter(x => x.id !== user.id)
        );
      }
    });
  }
}

