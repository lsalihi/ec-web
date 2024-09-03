import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { SafetyFeature } from 'app/features/charging-stations/model/charging-station.model';

@Component({
  selector: 'app-images-contact',
  templateUrl: './images-contact.component.html',
  styleUrls: ['./images-contact.component.css']
})
export class ImagesContactComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  
  form: FormGroup;
  safetyFeatures = Object.values(SafetyFeature);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // We'll setup the form in ngAfterViewInit
  }

  ngAfterViewInit() {
    // Get the parent FormGroup
    const parentForm = this.formGroupDirective.form;
    // Get our FormGroup
    this.form = parentForm.get('imagesAndContact') as FormGroup;

    if (!this.form) {
      console.error('ImagesAndContact form group not found in parent form');
    }
  }

  get imagesFormArray(): FormArray {
    return this.form.get('images') as FormArray;
  }

  addImage() {
    this.imagesFormArray.push(this.fb.control(''));
  }

  removeImage(index: number) {
    this.imagesFormArray.removeAt(index);
  }
}