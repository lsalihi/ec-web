import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-availabilities',
  template: `
    <div [formGroup]="form" class="mb-4">
      <h2>Availabilities</h2>
      
      <button class="btn btn-primary" (click)="addAvailability()">
        Add Availability
      </button>

      <ul class="list-group mt-3">
        <li *ngFor="let availability of availabilitiesArray.controls; let i = index" class="list-group-item">
          <div>{{ getAvailabilityDescription(availability.value) }}</div>
          <div *ngIf="availability.value.note" class="text-muted">Note: {{ availability.value.note }}</div>
          <div class="mt-2">
            <button class="btn btn-sm btn-secondary me-2" (click)="editAvailability(i)">Edit</button>
            <button class="btn btn-sm btn-danger" (click)="removeAvailability(i)">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .list-group-item { display: flex; justify-content: space-between; align-items: center; }
  `]
})
export class AvailabilitiesComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  
  form: FormGroup;
  availabilityPatterns = [
    { value: 'always', label: 'Always available' },
    { value: 'weekdays', label: 'Weekdays only' },
    { value: 'weekends', label: 'Weekends only' },
    { value: 'custom', label: 'Custom schedule' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // We'll setup the form in ngAfterViewInit
  }

  ngAfterViewInit() {
    // Get the parent FormGroup
    const parentForm = this.formGroupDirective.form;
    // Get our FormGroup
    this.form = parentForm.get('availabilities') as FormGroup;

    if (!this.form) {
      console.error('Availabilities form group not found in parent form');
    }
  }

  get availabilitiesArray(): FormArray {
    return this.form.get('schedules') as FormArray;
  }

  addAvailability() {
    const dialogRef = this.openDialog(null);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.availabilitiesArray.push(this.fb.group(result));
      }
    });
  }

  editAvailability(index: number) {
    const dialogRef = this.openDialog(this.availabilitiesArray.at(index).value);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.availabilitiesArray.at(index).patchValue(result);
      }
    });
  }

  removeAvailability(index: number) {
    this.availabilitiesArray.removeAt(index);
  }

  getAvailabilityDescription(availability: any): string {
    if (availability.pattern === 'always') {
      return 'Always available';
    } else if (availability.pattern === 'weekdays') {
      return `Weekdays ${availability.startTime} - ${availability.endTime}`;
    } else if (availability.pattern === 'weekends') {
      return `Weekends ${availability.startTime} - ${availability.endTime}`;
    } else {
      const days = availability.days.join(', ');
      return `${days} ${availability.startTime} - ${availability.endTime}`;
    }
  }

  private openDialog(availability: any) {
    // This is a placeholder for opening a dialog
    // You'll need to implement your own dialog opening mechanism
    console.log('Opening dialog with', availability);
    // Return a mock dialog ref with an afterClosed method
    return {
      afterClosed: () => ({
        subscribe: (callback: (result: any) => void) => {
          // Simulate user input
          setTimeout(() => {
            callback(availability || { pattern: 'always', note: 'New availability' });
          }, 1000);
        }
      })
    };
  }
}