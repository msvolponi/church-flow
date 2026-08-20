import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { PersonService } from '@/app/core/services/person.service';
import { PersonMapper } from '@/app/shared/mappers/person.mapper';
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
import { TooltipModule } from 'primeng/tooltip';
import { Router } from '@angular/router';
import { PersonModel } from '../../../models/person.model';

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
    ConfirmDialogModule,
    TooltipModule],
  providers: [ConfirmationService],
  templateUrl: './person-list.html',
  styleUrl: './person-list.scss',
})
export class PersonList implements OnInit {

  people = signal<PersonModel[]>([]);

  @Output()
  edit = new EventEmitter<PersonModel>();

  constructor(
    private personService: PersonService,
    private toastMessageService: ToastMessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }


  ngOnInit() {
    this.load();
  }

  load(): void {
    this.personService.list().subscribe({
      next: people => this.people.set(people.map(person => PersonMapper.toModel(person))),
      error: () => this.toastMessageService.error(
        'Erro ao carregar pessoas',
        'Pessoas')
    });
  }

  onEdit(member: PersonModel): void {
    this.edit.emit(member);
  }

  onFollowUp(person: PersonModel): void {
    this.router.navigate(['/admin/person', person.id, 'follow-ups']);
  }

  onDelete(person: PersonModel): void {
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir '${person.fullName}'?`,
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.personService.delete(person.id!).subscribe({
          next: () => {
            this.people.update(list => list.filter(x => x.id !== person.id));
            this.toastMessageService.success('Pessoa excluída com sucesso', 'Pessoas');
          }
        });
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
