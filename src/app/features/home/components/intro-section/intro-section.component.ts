import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-intro-section',
  standalone: false,
  templateUrl: './intro-section.component.html',
  styleUrl: './intro-section.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-20%)', opacity: 0 }),
        animate('500ms ease-in', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class IntroSectionComponent {

}

