import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  @Input() formGroup: FormGroup;

  stationTypes: string[] = ['Type 1', 'Type 2', 'CHAdeMO', 'CCS'];
  stationStatuses: string[] = ['Available', 'In Use', 'Out of Order'];
  bookingOptions: string[] = ['Required', 'Optional', 'Not Available'];
  chargingDurations: number[] = [15, 30, 45, 60, 90, 120];
  energySources: string[] = ['Grid', 'Solar', 'Wind', 'Battery Storage'];
  paymentMethods: string[] = ['Credit Card', 'Debit Card', 'Mobile Payment', 'RFID Card'];

  constructor() { }

  ngOnInit(): void {
    // You can add any initialization logic here if needed
  }
}
