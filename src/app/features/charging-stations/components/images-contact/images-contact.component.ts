import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-images-contact',
  templateUrl: './images-contact.component.html',
  styleUrls: ['./images-contact.component.css']
})
export class ImagesContactComponent implements OnInit {
  @Input() form: FormGroup;

  safetyFeatures = [
    'Emergency Call Button',
    'Surveillance Cameras',
    'Lighting',
    'Security Personnel',
    'Fencing'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.form) {
      console.error('Form not provided to ImagesContactComponent');
      this.form = this.fb.group({
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
  }

  get imagesFormArray(): FormArray {
    return this.form.get('images') as FormArray;
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