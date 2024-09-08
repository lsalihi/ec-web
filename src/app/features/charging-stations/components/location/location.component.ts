import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccessibilityFeature, Amenity } from '../../model/charging-station.model';

interface AutocompleteResult {
  address: string;
  latitude: number;
  longitude: number;
  street: string;
  streetNumber: string;
  complementAddress: string;
  city: string;
  postalCode: string;
  country: string;

  displayName: string;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, AfterViewInit {
  @Input() formGroup!: FormGroup;

  map!: L.Map;
  marker!: L.Marker;
  autocompleteResults: any[] = [];
  mapInitialized = false;

  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  accessibilityFeatures = Object.values(AccessibilityFeature);
  amenities = Object.values(Amenity);

  private geoapifyApiKey = '80ed0732fd5241f6b04a1a9453a07127'; // Replace with your actual Geoapify API key

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

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
    this.reverseGeocode(lat, lng);
  }

  updateMarkerAndForm(lat: number, lng: number) {
    if (!this.mapInitialized) {
      console.warn('Map not initialized yet');
      return;
    }

    const latlng = L.latLng(lat, lng);
    this.marker.setLatLng(latlng);
    this.map.setView(latlng, 13);

    this.formGroup.patchValue({
      latitude: lat,
      longitude: lng
    });

    this.reverseGeocode(lat, lng);
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
        this.autocompleteResults = this.mapGeoapifyToAutocompleteResults(results);
      });
    }
  }

  getAddressSuggestions(query: string) {
    return this.http.get<any>(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${this.geoapifyApiKey}`
    );
  }

  mapGeoapifyToAutocompleteResults(response: any): AutocompleteResult[] {
    return response.features.map((feature: any) => {
      const props = feature.properties;
      return {
        address: props.formatted,
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0],
        street: props.street || '',
        streetNumber: props.housenumber || '',
        complementAddress: props.suburb || '',
        city: props.city || '',
        postalCode: props.postcode || '',
        country: props.country || '',
        displayName: [props.formatted].join(' ') || ''
      };
    });
  }

  selectAddress(result: AutocompleteResult) {
    this.formGroup.patchValue({
      address: result.address,
      latitude: result.latitude,
      longitude: result.longitude,
      street: result.street,
      streetNumber: result.streetNumber,
      complementAddress: result.complementAddress,
      city: result.city,
      postalCode: result.postalCode,
      country: result.country
    });

    this.updateMarkerAndForm(result.latitude, result.longitude);
    this.autocompleteResults = [];
  }

  reverseGeocode(lat: number, lon: number) {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${this.geoapifyApiKey}`;

    this.http.get(url).subscribe((result: any) => {
      if (result && result.features.length > 0) {
        const address = result.features[0].properties;
        this.formGroup.patchValue({
          address: address.formatted,
          street: address.street || '',
          streetNumber: address.housenumber || '',
          complementAddress: address.suburb || '',
          city: address.city || '',
          postalCode: address.postcode || '',
          country: address.country || '',
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
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.updateMarkerAndForm(lat, lon);
      }, (error) => {
        console.error('Error getting location', error);
        alert('Unable to retrieve your location');
      });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }
}