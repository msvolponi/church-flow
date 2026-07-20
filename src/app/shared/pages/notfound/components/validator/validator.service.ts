import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  isValidField(form: FormGroup, field: string, type: string): boolean {
    const control = form.get(field);
    if (!control) return false;
    return (control.hasError(type) || form.hasError(type)) && control.touched;
  }

  validate(form: FormGroup): boolean {
    if (!form.valid) {
      this.validateAllFormFields(form);
      return false;
    }
    return true;
  }

  private validateAllFormFields(form: FormGroup): void {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  matchFields(field: string, confirmField: string): (form: AbstractControl) => { mustMatch: boolean } | null {
    return (form: AbstractControl) => {
      const value1 = form.get(field)?.value;
      const value2 = form.get(confirmField)?.value;
      return value1 === value2 ? null : { mustMatch: true };
    };
  }
}
