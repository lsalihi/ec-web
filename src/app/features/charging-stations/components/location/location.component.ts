import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccessibilityFeature, Amenity } from '../../model/charging-station.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {
  @Input() formGroup!: FormGroup;

  map!: L.Map;
  marker!: L.Marker;
  autocompleteResults: { display_name: string; lat: number; lon: number; }[] = [];
  mapInitialized = false;

  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  accessibilityFeatures = Object.values(AccessibilityFeature);
  amenities = Object.values(Amenity);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setupAutocomplete();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap(): void {
    if (!this.map && this.mapElement && this.mapElement.nativeElement) {
      this.map = L.map(this.mapElement.nativeElement).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.marker = L.marker([51.505, -0.09], {
        draggable: true
      }).addTo(this.map);

      this.marker.on('dragend', () => {
        const position = this.marker.getLatLng();
        this.updateFormLocation(position.lat, position.lng);
      });

      this.mapInitialized = true;
    }
  }

  updateFormLocation(lat: number, lng: number): void {
    this.formGroup.patchValue({
      latitude: lat,
      longitude: lng
    });
    this.reverseGeocode(L.latLng(lat, lng));
  }

  updateMarkerAndForm(latlng: L.LatLng) {
    if (!this.mapInitialized) {
      console.warn('Map not initialized yet');
      return;
    }

    this.marker.setLatLng(latlng);
    this.map.setView(latlng, 13);

    this.formGroup.patchValue({
      latitude: latlng.lat,
      longitude: latlng.lng
    });

    this.reverseGeocode(latlng);
  }

  setupAutocomplete() {
    const addressControl = this.formGroup.get('address');
    if (addressControl) {
      addressControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(address => {
          if (address.length < 3) {
            return of([]);
          }
          return this.getAddressSuggestions(address);
        })
      ).subscribe(results => {
        this.autocompleteResults = results;
      });
    }
  }

  getAddressSuggestions(query: string) {
    return this.http.get<{ display_name: string; lat: number; lon: number; }[]>(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
  }

  selectAddress(result: any) {
    this.formGroup.patchValue({
      address: result.display_name,
      latitude: result.lat,
      longitude: result.lon,
      street: result.address.road,
      streetNumber: result.address.house_number,
      city: result.address.city,
      postalCode: result.address.postcode,
      country: result.address.country,
    });

    const latlng = L.latLng(result.lat, result.lon);
    this.updateMarkerAndForm(latlng);
    this.autocompleteResults = [];
  }

  reverseGeocode(latlng: L.LatLng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`;

    this.http.get(url).subscribe((result: any) => {
      if (result && result.display_name) {
        this.formGroup.patchValue({
          address: result.display_name,
          street: result.address.road,
          streetNumber: result.address.house_number,
          city: result.address.city,
          postalCode: result.address.postcode,
          country: result.address.country,
        });
      } else {
        console.warn('No address found for the given coordinates');
      }
    }, error => {
      console.error('Error in reverse geocoding', error);
    });
  }

  useCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latlng = L.latLng(position.coords.latitude, position.coords.longitude);
        this.updateMarkerAndForm(latlng);
      }, (error) => {
        console.error('Error getting location', error);
        alert('Unable to retrieve your location');
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }
}