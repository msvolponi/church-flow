import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { PersonListModel } from '../../../models/person-list.model';

import { PersonService } from '@/app/core/services/person.service';
import { ToastMessageService } from '@/app/shared/services/toast-message.service';
import { FormsModule } from '@angular/forms';
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
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-person-list',
  standalone: true,
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
  providers: [ConfirmationService],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
})
export class PersonList implements OnInit {

  people = signal<PersonListModel[]>([]);

  @Output()
  edit = new EventEmitter<PersonListModel>();

  constructor(
    private personService: PersonService,
    private toastMessageService: ToastMessageService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit() {
    this.reload();
  }

  reload(): void {
    this.personService.list().subscribe({
      next: people => this.people.set(people),
      error: () => this.toastMessageService.error(
        'Erro ao carregar pessoas',
        'Pessoas')
    });
  }

  onEdit(member: PersonListModel): void {
    this.edit.emit(member);
  }

  onDelete(person: PersonListModel): void {
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir '${person.fullName}'?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.personService.delete(person.id).subscribe({
          next: () => {
            this.people.update(list => list.filter(x => x.id !== person.id));
            this.toastMessageService.success('Pessoa excluída com sucesso', 'Pessoas');
          }
        });
      }
    });
  }
}
