import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,  // Declare the HeaderComponent
    FooterComponent   // Declare the FooterComponent
  ],
  imports: [
    CommonModule      // Import CommonModule for common directives
  ],
  exports: [
    HeaderComponent,  // Export the HeaderComponent to be used in other modules
    FooterComponent   // Export the FooterComponent to be used in other modules
  ]
})
export class LayoutModule { }