import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,  // Declare the HeaderComponent
    FooterComponent
  ],
  imports: [
    CommonModule,      // Import CommonModule for common directives,
    RouterModule
  ],
  exports: [
    HeaderComponent,  // Export the HeaderComponent to be used in other modules
    FooterComponent,  // Export the FooterComponent to be used in other modules
  ]
})
export class LayoutModule { }