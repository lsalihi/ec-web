import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookingOptions, ChargingSpeed, EnergySource, PaymentMethod, StationAccessibility, StationStatus } from '../../model/charging-station.model';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() formGroup: FormGroup;

  stationAccessiblity: string[] = Object.values(StationAccessibility);
  chargingSpeed : string[] = Object.values(ChargingSpeed);
  stationStatuses: string[] = Object.values(StationStatus); //['Available', 'In Use', 'Out of Order', 'Under Construction'];
  bookingOptions: string[] = Object.values(BookingOptions); //['Required', 'Optional', 'Not Available'];
  energySources: string[] = Object.values(EnergySource); 
  paymentMethods: string[] = Object.values(PaymentMethod);

  constructor() { }

  ngOnInit(): void {
    // You can add any initialization logic here if needed
  }
}
