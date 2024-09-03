import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.css']
})
export class ConnectorsComponent implements OnInit {
  @Input() formArray!: FormArray;

  connectorForm!: FormGroup;
  showConnectorPopup = false;
  editingConnectorIndex = -1;
  connectorTypes = ['Type 1', 'Type 2', 'CHAdeMO', 'CCS', 'Tesla'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initConnectorForm();
  }

  get connectors() {
    return this.formArray.controls as FormGroup[];
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
  }

  closeConnectorPopup() {
    this.showConnectorPopup = false;
    this.editingConnectorIndex = -1;
    this.connectorForm.reset({quantity: 1});
  }

  saveConnector() {
    if (this.connectorForm.valid) {
      if (this.editingConnectorIndex === -1) {
        this.formArray.push(this.fb.control(this.connectorForm.value));
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
  }

  deleteConnector(index: number) {
    this.formArray.removeAt(index);
  }

  incrementConnector(index: number) {
    const quantityControl = this.formArray.at(index).get('quantity');
    if (quantityControl) { // Check if the control exists
      const currentQuantity = quantityControl.value || 0; // Default to 0 if value is null
      quantityControl.patchValue(currentQuantity + 1);
    }
  }
  
  decrementConnector(index: number) {
    const quantityControl = this.formArray.at(index).get('quantity');
    if (quantityControl) { // Check if the control exists
      const currentQuantity = quantityControl.value || 0; // Default to 0 if value is null
      if (currentQuantity > 1) {
        quantityControl.patchValue(currentQuantity - 1);
      }
    }
  }
  
}