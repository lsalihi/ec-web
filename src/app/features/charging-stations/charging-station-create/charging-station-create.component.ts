import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { ChargingStation, StationType, StationStatus, BookingOptions, ChargingDuration, EnergySource, PaymentMethod, AccessibilityFeature, Amenity, SafetyFeature, ConnectorType, ConnectorStatus } from 'app/features/charging-stations/model/charging-station.model';
import { ChargingStationState } from 'app/services/charing-station/charging-station.reducer';
import * as ChargingStationActions from 'app/services/charing-station/charging-station.actions';

@Component({
  selector: 'app-charging-station-create',
  templateUrl: './charging-station-create.component.html',
  styleUrls: ['./charging-station-create.component.css']
})
export class ChargingStationCreateComponent implements OnInit, OnDestroy {
  chargingStationForm!: FormGroup;
  private formSubscription!: Subscription;

  // Enums for dropdown options
  stationTypes = Object.values(StationType);
  stationStatuses = Object.values(StationStatus);
  bookingOptions = Object.values(BookingOptions);
  chargingDurations = Object.values(ChargingDuration);
  energySources = Object.values(EnergySource);
  paymentMethods = Object.values(PaymentMethod);
  accessibilityFeatures = Object.values(AccessibilityFeature);
  amenities = Object.values(Amenity);
  safetyFeatures = Object.values(SafetyFeature);
  connectorTypes = Object.values(ConnectorType);
  connectorStatuses = Object.values(ConnectorStatus);

  connectors: any[] = [];
  showConnectorPopup = false;
  editingConnectorIndex = -1;
  connectorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ chargingStation: ChargingStationState }>
  ) { }

  ngOnInit() {
    this.chargingStationForm = this.initForm();
    this.loadDraft();
    this.setupAutoSave();

    this.connectorForm = this.fb.group({
      connectorType: ['', Validators.required],
      power: [0, [Validators.required, Validators.min(0)]],
      voltage: [0, [Validators.required, Validators.min(0)]],
      intensity: [0, [Validators.required, Validators.min(0)]],
      chargingSpeed: [0, [Validators.required, Validators.min(0)]],
      connectorFormat: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      basicInfo: this.fb.group({
        name: ['', Validators.required],
        type: [StationType.PUBLIC, Validators.required],
        status: [StationStatus.ACTIVE, Validators.required],
        bookingOptions: [BookingOptions.NO_BOOKING, Validators.required],
        pricePerChargingSession: [0, [Validators.required, Validators.min(0)]],
        durationOfChargingSession: [ChargingDuration.THIRTY_MIN, Validators.required],
        capacity: [0, [Validators.required, Validators.min(1)]],
        energySource: [[], Validators.required],
        maxPowerOutput: [0, [Validators.required, Validators.min(0)]],
        paymentMethods: [[], Validators.required],
        networkOperator: ['', Validators.required],
      }),
      location: this.fb.group({
        street: ['', Validators.required],
        streetNumber: ['', Validators.required],
        complementAddress: [''],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
        latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
        longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]],
        instructions: [''],
        accessibilityFeatures: [[]],
        amenities: [[]]
      }),
      connectors: this.fb.array([]),
      availabilities: this.fb.array([]),
      images: this.fb.array([]),
      contactAndSafety: this.fb.group({
        allowWhatsApp: [false],
        allowEmail: [false],
        emailContact: [''],
        whatsAppNumber: [''],
        safetyFeatures: [[]]
      })
    });
  }

  loadDraft() {
    this.store.dispatch(ChargingStationActions.loadFormDraft());
    this.store.select(state => state.chargingStation.formDraft)
      .subscribe(draft => {
        if (draft) {
          this.chargingStationForm.patchValue(draft);
          // Handle arrays separately
          if (draft.connectors) {
            this.setConnectors(draft.connectors);
          }
          if (draft.availabilities) {
            this.setAvailabilities(draft.availabilities);
          }
          if (draft.images) {
            this.setImages(draft.images);
          }
        }
      });
  }

  setupAutoSave() {
    this.formSubscription = this.chargingStationForm.valueChanges.pipe(
      debounce(() => timer(500))
    ).subscribe(formValue => {
      this.store.dispatch(ChargingStationActions.saveFormDraft({ formData: formValue }));
    });
  }

  onSubmit() {
    if (this.chargingStationForm.valid) {
      const formData = this.chargingStationForm.value as ChargingStation;
      this.store.dispatch(ChargingStationActions.submitForm({ formData }));
    } else {
      this.markFormGroupTouched(this.chargingStationForm);
    }
  }

  addConnector() {
    const connectorForm = this.fb.group({
      connectorType: [ConnectorType.TYPE1, Validators.required],
      power: [0, [Validators.required, Validators.min(0)]],
      chargingSpeed: [0, [Validators.required, Validators.min(0)]],
      connectorFormat: ['', Validators.required],
      powerType: ['', Validators.required],
      intensity: [0, [Validators.required, Validators.min(0)]],
      voltage: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      status: [ConnectorStatus.OPERATIONAL, Validators.required]
    });
    (this.chargingStationForm.get('connectors') as FormArray).push(connectorForm);
  }

  removeConnector(index: number) {
    (this.chargingStationForm.get('connectors') as FormArray).removeAt(index);
  }

  addAvailability() {
    const availabilityForm = this.fb.group({
      dayOfWeek: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    (this.chargingStationForm.get('availabilities') as FormArray).push(availabilityForm);
  }

  removeAvailability(index: number) {
    (this.chargingStationForm.get('availabilities') as FormArray).removeAt(index);
  }

  addImage() {
    const imageForm = this.fb.control('', Validators.required);
    (this.chargingStationForm.get('images') as FormArray).push(imageForm);
  }

  removeImage(index: number) {
    (this.chargingStationForm.get('images') as FormArray).removeAt(index);
  }

  private setConnectors(connectors: any[]) {
    const connectorForms = connectors.map(connector => this.fb.group(connector));
    const connectorFormArray = this.fb.array(connectorForms);
    this.chargingStationForm.setControl('connectors', connectorFormArray);
  }

  private setAvailabilities(availabilities: any[]) {
    const availabilityForms = availabilities.map(availability => this.fb.group(availability));
    const availabilityFormArray = this.fb.array(availabilityForms);
    this.chargingStationForm.setControl('availabilities', availabilityFormArray);
  }

  private setImages(images: string[]) {
    const imageForms = images.map(image => this.fb.control(image));
    const imageFormArray = this.fb.array(imageForms);
    this.chargingStationForm.setControl('images', imageFormArray);
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  // Getter methods for easy access in the template
  get connectorsFormArray() {
    return this.chargingStationForm.get('connectors') as FormArray;
  }

  get availabilitiesFormArray() {
    return this.chargingStationForm.get('availabilities') as FormArray;
  }

  get imagesFormArray() {
    return this.chargingStationForm.get('images') as FormArray;
  }

  // handling navigation steps
  currentStep = 1;

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

  openConnectorPopup() {
    this.showConnectorPopup = true;
    this.editingConnectorIndex = -1;
    this.connectorForm.reset({quantity: 1});
  }

  closeConnectorPopup() {
    this.showConnectorPopup = false;
    this.connectorForm.reset({quantity: 1});
  }

  saveConnector() {
    if (this.connectorForm.valid) {
      const connectorData = this.connectorForm.value;
      if (this.editingConnectorIndex === -1) {
        this.connectors.push(connectorData);
      } else {
        this.connectors[this.editingConnectorIndex] = connectorData;
      }
      this.closeConnectorPopup();
    }
  }

  editConnector(index: number) {
    this.editingConnectorIndex = index;
    this.connectorForm.patchValue(this.connectors[index]);
    this.showConnectorPopup = true;
  }

  deleteConnector(index: number) {
    this.connectors.splice(index, 1);
  }

  incrementConnector(index: number) {
    this.connectors[index].quantity++;
  }

  decrementConnector(index: number) {
    if (this.connectors[index].quantity > 1) {
      this.connectors[index].quantity--;
    }
  }
}