import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.css']
})
export class ConnectorsComponent implements OnInit {
  @Input() formArray: FormArray;
  @Input() stationCapacity: number;

  connectorForm: FormGroup;
  showConnectorPopup = false;
  editingConnectorIndex = -1;
  connectorTypes = ['Type 1', 'Type 2', 'CHAdeMO', 'CCS', 'Tesla'];
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initConnectorForm();
  }

  get connectors() {
    return this.formArray.controls;
  }

  get totalConnectorQuantity(): number {
    return this.connectors.reduce((total, connector) => total + connector.get('quantity')?.value, 0);
  }

  initConnectorForm() {
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

  openConnectorPopup() {
    this.showConnectorPopup = true;
    this.editingConnectorIndex = -1;
    this.connectorForm.reset({quantity: 1});
    this.errorMessage = '';
  }

  closeConnectorPopup() {
    this.showConnectorPopup = false;
    this.editingConnectorIndex = -1;
    this.connectorForm.reset({quantity: 1});
    this.errorMessage = '';
  }

  saveConnector() {
    if (this.connectorForm.valid) {
      const newQuantity = this.connectorForm.get('quantity')?.value;
      const totalQuantity = this.editingConnectorIndex === -1 
        ? this.totalConnectorQuantity + newQuantity
        : this.totalConnectorQuantity - this.connectors[this.editingConnectorIndex].get('quantity')?.value + newQuantity;

      if (totalQuantity > this.stationCapacity) {
        this.errorMessage = `Total connector quantity (${totalQuantity}) exceeds station capacity (${this.stationCapacity}).`;
        return;
      }

      if (this.editingConnectorIndex === -1) {
        this.formArray.push(this.fb.group(this.connectorForm.value));
      } else {
        this.formArray.at(this.editingConnectorIndex).patchValue(this.connectorForm.value);
      }
      this.closeConnectorPopup();
    }
  }

  editConnector(index: number) {
    this.editingConnectorIndex = index;
    this.connectorForm.patchValue(this.formArray.at(index).value);
    this.showConnectorPopup = true;
    this.errorMessage = '';
  }

  deleteConnector(index: number) {
    this.formArray.removeAt(index);
    this.errorMessage = '';
  }

  incrementConnector(index: number) {
    if (this.totalConnectorQuantity >= this.stationCapacity) {
      this.errorMessage = `Cannot increase quantity. Total connector quantity (${this.totalConnectorQuantity}) already at station capacity (${this.stationCapacity}).`;
      return;
    }
    const currentQuantity = this.formArray.at(index).get('quantity')?.value;
    this.formArray.at(index).patchValue({quantity: currentQuantity + 1});
    this.errorMessage = '';
  }

  decrementConnector(index: number) {
    const currentQuantity = this.formArray.at(index).get('quantity')?.value;
    if (currentQuantity > 1) {
      this.formArray.at(index).patchValue({quantity: currentQuantity - 1});
    }
    this.errorMessage = '';
  }
}