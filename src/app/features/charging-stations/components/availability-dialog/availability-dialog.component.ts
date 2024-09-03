import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-availability-dialog',
  template: `
    <div class="dialog-container">
      <h2  class="section-title">{{ data.availability ? 'Edit' : 'Add' }} Availability</h2>
      <form [formGroup]="availabilityForm">
        <div class="form-group">
          <label for="pattern">Availability Pattern</label>
          <select id="pattern" formControlName="pattern" class="form-control">
            <option *ngFor="let pattern of availabilityPatterns" [value]="pattern.value">
              {{ pattern.label }}
            </option>
          </select>
        </div>

        <ng-container *ngIf="availabilityForm.get('pattern')?.value === 'custom'">
          <div class="form-group">
            <label>Days</label>
            <div class="checkbox-group">
              <div *ngFor="let day of weekDays" class="form-check">
                <input type="checkbox" [id]="day" [value]="day" (change)="onDayChange($event)" class="form-check-input">
                <label [for]="day" class="form-check-label">{{ day }}</label>
              </div>
            </div>
          </div>
        </ng-container>

        <ng-container *ngIf="availabilityForm.get('pattern')?.value !== 'always'">
          <div class="form-group">
            <label for="startTime">Start Time</label>
            <input id="startTime" type="time" formControlName="startTime" class="form-control">
          </div>

          <div class="form-group">
            <label for="endTime">End Time</label>
            <input id="endTime" type="time" formControlName="endTime" class="form-control">
          </div>
        </ng-container>

        <div class="form-group">
          <label for="note">Note</label>
          <textarea id="note" formControlName="note" class="form-control"></textarea>
        </div>
      </form>
      <div class="dialog-actions">
        <button (click)="onCancel()" class="btn btn-secondary">Cancel</button>
        <button (click)="onSave()" [disabled]="availabilityForm.invalid" class="btn btn-primary">Save</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container { padding: 20px; }
    .form-group { margin-bottom: 15px; }
    .form-control { width: 100%; padding: 5px; }
    .checkbox-group { display: flex; flex-wrap: wrap; }
    .form-check { margin-right: 10px; }
    .dialog-actions { display: flex; justify-content: flex-end; margin-top: 20px; }
    .btn { padding: 5px 10px; margin-left: 10px; }
  `]
})
export class AvailabilityDialogComponent {
  availabilityForm: FormGroup;
  availabilityPatterns = [
    { value: 'always', label: 'Always available' },
    { value: 'weekdays', label: 'Weekdays only' },
    { value: 'weekends', label: 'Weekends only' },
    { value: 'custom', label: 'Custom schedule' }
  ];
  weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(
    private fb: FormBuilder,
    @Inject('MAT_DIALOG_DATA') public data: { availability: any },
    @Inject('MAT_DIALOG_REF') public dialogRef: any
  ) {
    this.initForm();
  }

  initForm() {
    this.availabilityForm = this.fb.group({
      pattern: ['always', Validators.required],
      days: [[]],
      startTime: [''],
      endTime: [''],
      note: ['']
    });

    if (this.data.availability) {
      this.availabilityForm.patchValue(this.data.availability);
    }

    this.availabilityForm.get('pattern')?.valueChanges.subscribe(value => {
      if (value === 'custom') {
        this.availabilityForm.get('days')?.setValidators([Validators.required]);
      } else {
        this.availabilityForm.get('days')?.clearValidators();
      }
      this.availabilityForm.get('days')?.updateValueAndValidity();

      if (value !== 'always') {
        this.availabilityForm.get('startTime')?.setValidators([Validators.required]);
        this.availabilityForm.get('endTime')?.setValidators([Validators.required]);
      } else {
        this.availabilityForm.get('startTime')?.clearValidators();
        this.availabilityForm.get('endTime')?.clearValidators();
      }
      this.availabilityForm.get('startTime')?.updateValueAndValidity();
      this.availabilityForm.get('endTime')?.updateValueAndValidity();
    });
  }

  onDayChange(event: any) {
    const selectedDays = this.availabilityForm.get('days')?.value || [];
    if (event.target.checked) {
      selectedDays.push(event.target.value);
    } else {
      const index = selectedDays.indexOf(event.target.value);
      if (index > -1) {
        selectedDays.splice(index, 1);
      }
    }
    this.availabilityForm.patchValue({ days: selectedDays });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.availabilityForm.valid) {
      this.dialogRef.close(this.availabilityForm.value);
    }
  }
}