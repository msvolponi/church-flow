import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validator',
  standalone: true,
  imports: [],
  templateUrl: './validator.html',
  styleUrl: './validator.scss',
})
export class Validator {
  @Input() errorMsg = '';
  @Input() displayError: boolean | undefined = false;
}
