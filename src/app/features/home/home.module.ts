import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';  // Ensure this is correctly imported
import { HomeRoutingModule } from './home-routing.module';  // Correctly import your routing module

import { IntroSectionComponent } from './components/intro-section/intro-section.component';
import { FindChargingPointComponent } from './components/find-charging-point/find-charging-point.component';
import { PublishChargingPointComponent } from './components/publish-charging-point/publish-charging-point.component';
import { StatsComponent } from './components/stats/stats.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { LayoutModule } from '../../layouts.module';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@NgModule({
  declarations: [
    HomeComponent,
    IntroSectionComponent,
    FindChargingPointComponent,
    PublishChargingPointComponent,
    StatsComponent,
    TestimonialsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    LayoutModule,
    //BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDivider
  ]
})
export class HomeModule { }
