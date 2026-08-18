import { Component, ViewChild } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { PersonModel } from '../../models/person.model';
import { PersonList } from './list/person-list';
import { PersonForm } from './register/person-form';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [DialogModule, PersonList, PersonForm, ToolbarModule, ButtonModule],
  templateUrl: './person-page.html',
  styleUrl: './person-page.scss',
})
export class PersonPage {

  @ViewChild(PersonList)
  private personList!: PersonList;

  dialog = false;

  selected: PersonModel | null = null;

  onCreate(): void {

    this.selected = null;
    this.dialog = true;
  }

  onEdit(person: PersonModel): void {

    this.selected = person;
    this.dialog = true;
  }

  onSaved(): void {

    this.dialog = false;
    this.personList.load();
  }
}
