import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-availability-dialog',
  template: `
  <div class="dialog-container">
  <h2 class="dialog-title">{{ data.availability ? 'Edit' : 'Add' }} Availability</h2>
  <div class="dialog-content">
    <form [formGroup]="availabilityForm">
      <div class="form-group">
        <label for="pattern">Availability Pattern</label>
        <select id="pattern" formControlName="pattern" class="form-control">
          <option *ngFor="let pattern of availabilityPatterns" [value]="pattern.value">
            {{pattern.label}}
          </option>
        </select>
      </div>

      <ng-container *ngIf="availabilityForm.get('pattern')?.value === 'custom'">
        <div class="form-group">
          <label>Days</label>
          <div class="checkbox-group" formArrayName="days">
            <div *ngFor="let day of weekDays; let i = index" class="form-check">
              <input type="checkbox" [id]="day" [formControlName]="i" class="form-check-input">
              <label [for]="day" class="form-check-label">{{day}}</label>
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
  </div>
  <div class="dialog-actions">
    <button class="btn btn-secondary" (click)="onCancel()">Cancel</button>
    <button class="btn btn-primary" (click)="onSave()" [disabled]="availabilityForm.invalid">Save</button>
  </div>
</div>
  `,
  styles: [`
    .dialog-container { padding: 20px; }
    .dialog-title { 
      color: #1a2a6c;
      font-size: 1.5rem;
      margin-bottom: 20px;
      border-bottom: 2px solid #fdbb2d;
      padding-bottom: 10px;
    }
    .form-group { margin-bottom: 15px; }
    .form-control { 
      width: 100%; 
      padding: 8px;
      border: 1px solid #e9ecef;
      border-radius: 4px;
      font-size: 14px;
    }
    .checkbox-group { display: flex; flex-wrap: wrap; }
    .form-check { margin-right: 15px; margin-bottom: 10px; }
    .form-check-input { margin-right: 5px; }
    .dialog-actions { 
      display: flex; 
      justify-content: flex-end; 
      margin-top: 20px;
      gap: 10px;
    }
    .btn { 
      padding: 8px 15px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }
    .btn-primary {
      background-color: #1a2a6c;
      color: white;
      border: none;
    }
    .btn-secondary {
      background-color: #f8f9fa;
      color: #1a2a6c;
      border: 1px solid #1a2a6c;
    }
  `]
})
export class AvailabilityDialogComponent implements OnInit {
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
    public dialogRef: MatDialogRef<AvailabilityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { availability: any }
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.availabilityForm = this.fb.group({
      pattern: ['always', Validators.required],
      days: this.fb.array([]),
      startTime: [''],
      endTime: [''],
      note: ['']
    });

    this.initDaysArray();

    if (this.data && this.data.availability) {
      this.availabilityForm.patchValue(this.data.availability);
      if (this.data.availability.days && Array.isArray(this.data.availability.days)) {
        this.setDays(this.data.availability.days);
      }
    }

    this.availabilityForm.get('pattern')?.valueChanges.subscribe(value => {
      this.updateValidators(value);
    });

    this.updateValidators(this.availabilityForm.get('pattern')?.value);
  }

  updateValidators(pattern: string) {
    const daysArray = this.availabilityForm.get('days') as FormArray;
    const startTimeControl = this.availabilityForm.get('startTime');
    const endTimeControl = this.availabilityForm.get('endTime');

    if (pattern === 'custom') {
      daysArray.setValidators([Validators.required]);
    } else {
      daysArray.clearValidators();
    }

    if (pattern !== 'always') {
      startTimeControl?.setValidators([Validators.required]);
      endTimeControl?.setValidators([Validators.required]);
    } else {
      startTimeControl?.clearValidators();
      endTimeControl?.clearValidators();
      startTimeControl?.setValue('');
      endTimeControl?.setValue('');
    }

    daysArray.updateValueAndValidity();
    startTimeControl?.updateValueAndValidity();
    endTimeControl?.updateValueAndValidity();
  }

  initDaysArray() {
    const daysArray = this.availabilityForm.get('days') as FormArray;
    this.weekDays.forEach(() => {
      daysArray.push(this.fb.control(false));
    });
  }

  setDays(selectedDays: string[]) {
    const daysArray = this.availabilityForm.get('days') as FormArray;
    this.weekDays.forEach((day, index) => {
      daysArray.at(index).setValue(selectedDays.includes(day));
    });
  }

  onDayChange(index: number) {
    const daysArray = this.availabilityForm.get('days') as FormArray;
    daysArray.at(index).setValue(!daysArray.at(index).value);
  }

  onSave(): void {
    if (this.availabilityForm.valid) {
      const formValue = this.availabilityForm.value;
      if (formValue.pattern === 'custom') {
        formValue.days = this.weekDays.filter((day, index) => formValue.days[index]);
      } else {
        formValue.days = [];
      }
      this.dialogRef.close(formValue);
    } else {
      Object.keys(this.availabilityForm.controls).forEach(key => {
        const control = this.availabilityForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}