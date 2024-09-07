import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  template: `
    <div class="form-group" [formGroup]="parentForm">
      <label [for]="fieldName" class="form-label">
        {{ label }}
        <span *ngIf="isRequired" class="required-asterisk">*</span>
      </label>
      <select
        [id]="fieldName"
        [formControlName]="fieldName"
        class="form-select"
        [ngClass]="{'is-invalid': isInvalid}"
        [attr.multiple]="multiple ? '' : null"
        (change)="onSelectionChange($event)"
      >
        <option *ngIf="!multiple" value="">Select {{ label }}</option>
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
      <div *ngIf="isInvalid" class="invalid-feedback">
        This field is required.
      </div>
    </div>
  `,
  styles: [`
    .required-asterisk { color: red; margin-left: 3px; }
    .is-invalid { border-color: #dc3545; }
    .invalid-feedback { color: #dc3545; font-size: 0.875em; margin-top: 0.25rem; }
    select[multiple] { height: auto; min-height: 100px; }
  `]
})
export class FormSelectComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() fieldName: string;
  @Input() label: string;
  @Input() options: {value: any, label: string}[];
  @Input() multiple: boolean = false;


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

  ngOnInit() {
    console.log(`Initializing ${this.fieldName}:`, this.formField?.value);
    // Ensure the value is an array if multiple is true, regardless of current value state
    if (this.multiple && !Array.isArray(this.formField?.value)) {
      this.formField?.setValue([]);
    } else if (!this.multiple && Array.isArray(this.formField?.value)) {
      // If somehow an array is set on a single select, reset to first element or null
      this.formField?.setValue(this.formField?.value[0] || null);
    }
  }
  
  onSelectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    let selectedValues: any[] = [];
  
    if (this.multiple) {
      selectedValues = Array.from(select.selectedOptions).map(option => option.value);
      // Ensure the form control value is always an array for multiple select
      this.formField?.setValue(selectedValues);
    } else {
      this.formField?.setValue(select.value);
    }
  
    console.log(`${this.fieldName} changed:`, selectedValues || select.value);
    this.formField?.markAsTouched();
  }
}