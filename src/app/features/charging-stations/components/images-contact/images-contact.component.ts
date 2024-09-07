import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { SafetyFeature } from '../../model/charging-station.model';

@Component({
  selector: 'app-images-contact',
  templateUrl: './images-contact.component.html',
  styleUrls: ['./images-contact.component.css']
})
export class ImagesContactComponent implements OnInit {
  @Input() formGroup: FormGroup;
  safetyFeatures = Object.values(SafetyFeature);
 
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log('ImagesContactComponent initialized with formGroup:', this.formGroup);
    if (!this.formGroup) {
      console.error('FormGroup not provided to ImagesContactComponent');
    }
  }

  get imagesFormArray(): FormArray {
    return this.formGroup.get('images') as FormArray;
  }

  get contactAndSafetyForm(): FormGroup {
    return this.formGroup.get('contactAndSafety') as FormGroup;
  }

  onImageSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesFormArray.push(this.fb.control(e.target.result));
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removeImage(index: number) {
    this.imagesFormArray.removeAt(index);
  }
}