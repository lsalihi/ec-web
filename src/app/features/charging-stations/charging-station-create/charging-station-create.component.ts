import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-charging-station-create',
  styleUrls: ['./charging-station-create.component.css'],
  template: `
    <form [formGroup]="chargingStationForm" (ngSubmit)="onSubmit()" class="container mt-4">
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item" *ngFor="let step of steps; let i = index">
          <a class="nav-link" [class.active]="currentStep === i + 1" (click)="setStep(i + 1)">{{step}}</a>
        </li>
      </ul>

      <app-basic-info *ngIf="currentStep === 1" [formGroup]="basicInfoFormGroup"></app-basic-info>
      <app-location *ngIf="currentStep === 2" [formGroup]="locationFormGroup"></app-location>
      <app-connectors *ngIf="currentStep === 3" [formArray]="connectorsFormArray"></app-connectors>
      <app-availabilities *ngIf="currentStep === 4" [formArray]="availabilitiesFormArray"></app-availabilities>
      <app-images-contact *ngIf="currentStep === 5" [formGroup]="imagesContactFormGroup"></app-images-contact>

      <div class="navigation-buttons">
        <button type="button" class="btn btn-secondary me-2" (click)="previousStep()" [disabled]="currentStep === 1">Previous</button>
        <button type="button" class="btn btn-primary me-2" (click)="nextStep()" *ngIf="currentStep < 5">Next</button>
        <button type="submit" class="btn btn-success" *ngIf="currentStep === 5">Submit</button>
      </div>
    </form>
  `
})
export class ChargingStationCreateComponent implements OnInit {
  chargingStationForm!: FormGroup;
  currentStep = 1;
  steps = ['Basic Information', 'Location', 'Connectors', 'Availabilities', 'Images & Contact'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.chargingStationForm = this.fb.group({
      basicInfo: this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        status: ['', Validators.required],
        bookingOptions: ['', Validators.required],
        pricePerChargingSession: [0, [Validators.required, Validators.min(0)]],
        durationOfChargingSession: [30, [Validators.required, Validators.min(1)]],
        capacity: [0, [Validators.required, Validators.min(1)]],
        energySource: [[], Validators.required],
        maxPowerOutput: [0, [Validators.required, Validators.min(0)]],
        paymentMethods: [[], Validators.required],
        networkOperator: ['', Validators.required]
      }),
      location: this.fb.group({
        address: ['', Validators.required],
        latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
        longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
        street: [''],
        streetNumber: [''],
        complementAddress: [''],
        city: [''],
        postalCode: [''],
        country: [''],
        instructions: [''],
        accessibilityFeatures: [[]],
        amenities: [[]]
      }),
      connectors: this.fb.array([]),
      availabilities: this.fb.group({
        schedules: this.fb.array([])
      }),
      imagesAndContact: this.fb.group({
        images: this.fb.array([]),
        contactAndSafety: this.fb.group({
          allowWhatsApp: [false],
          allowEmail: [false],
          emailContact: ['', Validators.email],
          whatsAppNumber: [''],
          safetyFeatures: [[]]
        })
      })
    });
  }

  // Getter methods for easy access in the template
  get basicInfoFormGroup(): FormGroup {
    return this.chargingStationForm.get('basicInfo') as FormGroup;
  }

  get locationFormGroup(): FormGroup {
    return this.chargingStationForm.get('location') as FormGroup;
  }

  get connectorsFormArray(): FormArray {
    return this.chargingStationForm.get('connectors') as FormArray;
  }

  get availabilitiesFormArray(): FormArray {
    return this.chargingStationForm.get('availabilities') as FormArray;
  }

  get imagesContactFormGroup(): FormGroup {
    return this.chargingStationForm.get('imagesAndContact') as FormGroup;
  }

  setStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.chargingStationForm.valid) {
      console.log(this.chargingStationForm.value);
      // Handle form submission
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.chargingStationForm);
      // Handle invalid form
    }
  }

  // Helper method to mark all controls in a form group as touched
  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}