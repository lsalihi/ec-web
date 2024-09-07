import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvailabilityDialogComponent } from '../availability-dialog/availability-dialog.component';

@Component({
  selector: 'app-availabilities',
  template: `
    <div [formGroup]="formGroup" class="availabilities-section">
      <h2 class="section-title">Availabilities</h2>
     
      <button class="btn btn-primary add-availability" (click)="addAvailability()">
        <i class="fas fa-plus"></i> Add Availability
      </button>
      
      <ul class="availability-list">
        <li *ngFor="let availability of availabilitiesArray.controls; let i = index" class="availability-item">
          <div class="availability-info">
            <span class="availability-description">{{ getAvailabilityDescription(availability.value) }}</span>
            <span *ngIf="availability.value.note" class="availability-note">Note: {{ availability.value.note }}</span>
          </div>
          <div class="availability-actions">
            <button class="btn btn-sm btn-secondary" (click)="editAvailability(i)">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-sm btn-danger" (click)="removeAvailability(i)">
              <i class="fas fa-trash"></i> Remove
            </button>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .availabilities-section {
      background-color: #f8f9fa;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      color: #1a2a6c;
      font-size: 1.5rem;
      margin-bottom: 20px;
      border-bottom: 2px solid #fdbb2d;
      padding-bottom: 10px;
    }
    .add-availability {
      margin-bottom: 20px;
    }
    .availability-list {
      list-style-type: none;
      padding: 0;
    }
    .availability-item {
      background-color: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .availability-info {
      flex-grow: 1;
    }
    .availability-description {
      font-weight: bold;
      color: #1a2a6c;
    }
    .availability-note {
      display: block;
      font-size: 0.9rem;
      color: #6c757d;
      margin-top: 5px;
    }
    .availability-actions {
      display: flex;
      gap: 10px;
    }
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
  `]
})
export class AvailabilitiesComponent implements OnInit, OnChanges {
  @Input() formGroup: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.initializeFormGroup();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formGroup'] && !changes['formGroup'].firstChange) {
      this.initializeFormGroup();
    }
  }

  private initializeFormGroup() {
    if (!this.formGroup) {
      console.warn('FormGroup not provided to AvailabilitiesComponent. Creating a new one.');
      this.formGroup = this.fb.group({
        schedules: this.fb.array([])
      });
    }
    console.log('AvailabilitiesComponent initialized with:', this.availabilitiesArray.value);
  }

  get availabilitiesArray(): FormArray {
    return this.formGroup.get('schedules') as FormArray;
  }

  addAvailability() {
    const dialogRef = this.dialog.open(AvailabilityDialogComponent, {
      width: '400px',
      data: { availability: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.availabilitiesArray.push(this.createAvailabilityFormGroup(result));
        console.log('Added availability:', this.availabilitiesArray.value);
      }
    });
  }

  editAvailability(index: number) {
    const dialogRef = this.dialog.open(AvailabilityDialogComponent, {
      width: '400px',
      data: { availability: this.availabilitiesArray.at(index).value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.availabilitiesArray.at(index).patchValue(this.sanitizeAvailabilityData(result));
      }
    });
  }

  removeAvailability(index: number) {
    this.availabilitiesArray.removeAt(index);
  }

  private createAvailabilityFormGroup(data: any): FormGroup {
    return this.fb.group({
      pattern: [data.pattern, Validators.required],
      days: [this.sanitizeDays(data.days)],
      startTime: [data.startTime],
      endTime: [data.endTime],
      note: [data.note]
    });
  }

  private sanitizeAvailabilityData(data: any): any {
    return {
      ...data,
      days: this.sanitizeDays(data.days)
    };
  }

  private sanitizeDays(days: any): string[] {
    if (Array.isArray(days)) {
      return days;
    } else if (typeof days === 'string') {
      return [days];
    } else {
      return [];
    }
  }

  getAvailabilityDescription(availability: any): string {
    if (!availability) return 'No availability set';

    const timeRange = availability.startTime && availability.endTime
      ? `${availability.startTime} - ${availability.endTime}`
      : 'All day';

    switch (availability.pattern) {
      case 'always':
        return 'Always available';
      case 'weekdays':
        return `Weekdays ${timeRange}`;
      case 'weekends':
        return `Weekends ${timeRange}`;
      case 'custom':
        const days = Array.isArray(availability.days) && availability.days.length > 0
          ? availability.days.join(', ')
          : 'Selected days';
        return `${days} ${timeRange}`;
      default:
        return 'Invalid availability pattern';
    }
  }
}