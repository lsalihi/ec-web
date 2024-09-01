import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChargingStation, StationType, StationStatus, BookingOptions, ChargingDuration } from '../model/charging-station.model';
import { ChargingStationService } from 'app/services/charging-station.service';

@Component({
  selector: 'app-charging-station-create',
  templateUrl: './charging-station-create.component.html',
  styleUrls: ['./charging-station-create.component.css']
})
export class ChargingStationCreateComponent implements OnInit {
  chargingStationForm!: FormGroup;
  currentStep = 1;
  totalSteps = 5;

  constructor(
    private fb: FormBuilder,
    private chargingStationService: ChargingStationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.chargingStationForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      type: [StationType.PUBLIC, Validators.required],
      capacity: [0, [Validators.required, Validators.min(1)]],
      status: [StationStatus.ACTIVE, Validators.required],
      bookingOptions: [BookingOptions.NO_BOOKING, Validators.required],
      pricePerChargingSession: [0, [Validators.required, Validators.min(0)]],
      durationOfChargingSession: [ChargingDuration.THIRTY_MIN, Validators.required],
      location: this.fb.group({
        street: ['', Validators.required],
        streetNumber: ['', Validators.required],
        complementAddress: [''],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
        latitude: [0, Validators.required],
        longitude: [0, Validators.required],
        instructions: ['']
      }),
      connectors: this.fb.array([]),
      availabilities: this.fb.array([]),
      images: this.fb.array([]),
      contactOptions: this.fb.group({
        allowWhatsApp: [false],
        allowEmail: [false],
        emailContact: [''],
        whatsAppNumber: ['']
      }),
      energySource: [[]],
      maxPowerOutput: [0, [Validators.required, Validators.min(0)]],
      paymentMethods: [[]],
      accessibilityFeatures: [[]],
      amenities: [[]],
      networkOperator: [''],
      safetyFeatures: [[]]
    });
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.chargingStationForm?.valid) {
      const chargingStation: ChargingStation = this.chargingStationForm.value;
      this.chargingStationService.createChargingStation(chargingStation).subscribe(
        (createdStation) => {
          console.log('Charging station created:', createdStation);
          this.router.navigate(['/charging-stations', createdStation.id]);
        },
        (error) => {
          console.error('Error creating charging station:', error);
          // Handle error (e.g., show error message to user)
        }
      );
    } else {
      console.log('Form is invalid');
      // Handle invalid form (e.g., show error messages)
    }
  }
}
