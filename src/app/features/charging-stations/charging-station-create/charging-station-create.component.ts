import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of, Subscription, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

import { ChargingStation, StationType, StationStatus, BookingOptions, ChargingDuration, EnergySource, PaymentMethod, AccessibilityFeature, Amenity, SafetyFeature, ConnectorType, ConnectorStatus } from 'app/features/charging-stations/model/charging-station.model';
import { ChargingStationState } from 'app/services/charing-station/charging-station.reducer';
import * as ChargingStationActions from 'app/services/charing-station/charging-station.actions';

@Component({
  selector: 'app-charging-station-create',
  templateUrl: './charging-station-create.component.html',
  styleUrls: ['./charging-station-create.component.css']
})
export class ChargingStationCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  chargingStationForm!: FormGroup;
  private formSubscription!: Subscription;

  map!: L.Map;
  marker!: L.Marker;
  autocompleteResults: { display_name: string; lat: number; lon: number; }[] = [];
  mapInitialized = false;

  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

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
    private store: Store<{ chargingStation: ChargingStationState }>,
    private http: HttpClient
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

    this.setupAutocomplete();
  }

  ngAfterViewInit(): void {
    this.initMap();
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
        address: ['', Validators.required],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required],
        instructions: [''],
        accessibilityFeatures: [[]],
        amenities: [[]],

        street: [''],
        streetNumber: [''],
        complementAddress: [''],
        city: [''],
        postalCode: [''],
        country: [''],
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
    // Example code to load form draft (implementation may vary)
    /*this.store.dispatch(ChargingStationActions.loadFormDraft());
    this.store.select(state => state.chargingStation.formDraft).subscribe(draft => {
      if (draft) {
        this.chargingStationForm.patchValue(draft);
        if (draft.connectors) this.setConnectors(draft.connectors);
        if (draft.availabilities) this.setAvailabilities(draft.availabilities);
        if (draft.images) this.setImages(draft.images);
      }
    }); */
  }

  setupAutoSave() {
    this.formSubscription = this.chargingStationForm.valueChanges.pipe(
      debounceTime(500)
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

  get connectorsFormArray() {
    return this.chargingStationForm.get('connectors') as FormArray;
  }

  get availabilitiesFormArray() {
    return this.chargingStationForm.get('availabilities') as FormArray;
  }

  get imagesFormArray() {
    return this.chargingStationForm.get('images') as FormArray;
  }

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
    this.connectorForm.reset({ quantity: 1 });
  }

  closeConnectorPopup() {
    this.showConnectorPopup = false;
    this.connectorForm.reset({ quantity: 1 });
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

  /** Location handling */
  initMap(): void {    setTimeout(() => {
    if (!this.map) {
      this.map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      const marker = L.marker([51.505, -0.09], {
        draggable: true
      }).addTo(this.map);

      marker.on('dragend', () => {
        const position = marker.getLatLng();
        this.updateFormLocation(position.lat, position.lng);
      });
    }
  }, 0); 
  }

  updateFormLocation(lat: number, lng: number): void {
    this.chargingStationForm.patchValue({
      location: {
        latitude: lat,
        longitude: lng
      }
    });
  }

  

  updateMarkerAndForm(latlng: L.LatLng) {
    if (!this.mapInitialized) {
      console.warn('Map not initialized yet');
      return;
    }

    if (this.marker) {
      this.marker.setLatLng(latlng);
    } else {
      this.marker = L.marker(latlng).addTo(this.map);
    }

    this.chargingStationForm.patchValue({
      location: {
        latitude: latlng.lat,
        longitude: latlng.lng
      }
    });

    this.reverseGeocode(latlng);
  }

  setupAutocomplete() {
    const addressControl = this.chargingStationForm.get('location.address');
    if (addressControl) {
      addressControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(address => {
          if (address.length < 3) {
            return of([]);
          }
          // Replace with actual geocoding service call
          return this.getAddressSuggestions(address);
        })
      ).subscribe(results => {
        this.autocompleteResults = results;
      });
    }
  }

  getAddressSuggestions(query: string) {
    // Example placeholder for a real geocoding API request
    return this.http.get<{ display_name: string; lat: number; lon: number; }[]>(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
  }

  selectAddress(result: any) {
    this.chargingStationForm.patchValue({
      location: {
        address: result.formatted,
        latitude: result.lat,
        longitude: result.lon,
        street: result.street,
        streetNumber: result.housenumber,
        complementAddress: [''],
        city: result.city,
        postalCode: result.postcode,
        country: result.country,
      }
    });


    const latlng = L.latLng(result.lat, result.lon);
    
    if (this.mapInitialized) {
      this.updateMarkerAndForm(latlng);
    } else {
      const initListener = () => {
        this.updateMarkerAndForm(latlng);
        this.map.off('load', initListener);
      };
      this.map.on('load', initListener);
    }

    this.autocompleteResults = [];
  }

  reverseGeocode(latlng: L.LatLng) {
    // Implement reverse geocoding logic here, possibly using a service like Nominatim
    console.log('Reverse geocoding for:', latlng.lat, latlng.lng);
  }

  useCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latlng = L.latLng(position.coords.latitude, position.coords.longitude);
        
        if (this.mapInitialized) {
          this.map.setView(latlng, 13);
          this.updateMarkerAndForm(latlng);
        } else {
          const initListener = () => {
            this.map.setView(latlng, 13);
            this.updateMarkerAndForm(latlng);
            this.map.off('load', initListener);
          };
          this.map.on('load', initListener);
        }
      }, (error) => {
        console.error('Error getting location', error);
        alert('Unable to retrieve your location');
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }
}
