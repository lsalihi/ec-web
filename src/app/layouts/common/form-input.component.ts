import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  template: `
    <div class="form-group" [formGroup]="parentForm">
      <label [for]="fieldName" class="form-label">
        {{ label }}
        <span *ngIf="isRequired" class="required-asterisk">*</span>
      </label>
      <input
        [type]="type"
        [id]="fieldName"
        [formControlName]="fieldName"
        class="form-control"
        [ngClass]="{'is-invalid': isInvalid}"
      >
      <div *ngIf="isInvalid" class="invalid-feedback">
        This field is required.
      </div>
    </div>
  `,
  styles: [`
    .required-asterisk {
      color: red;
      margin-left: 3px;
    }
    .is-invalid {
      border-color: #dc3545;
    }
    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875em;
      margin-top: 0.25rem;
    }
  `]
})
export class FormInputComponent {
  @Input() parentForm: FormGroup;
  @Input() fieldName: string;
  @Input() label: string;
  @Input() type: string = 'text';

  get formField(): AbstractControl | null {
    return this.parentForm.get(this.fieldName);
  }

  get isRequired(): boolean {
    const field = this.formField;
    return field ? field.hasValidator(Validators.required) : false;
  }

  get isInvalid(): boolean {
    const field = this.formField;
    return field ? (field.invalid && (field.touched || field.dirty)) : false;
  }
}