import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChargingStationsRoutingModule } from './charging-stations-routing.module';
import { ChargingStationListComponent } from './charging-station-list/charging-station-list.component';
import { ChargingStationCreateComponent } from './charging-station-create/charging-station-create.component';
import { ChargingStationDetailComponent } from './charging-station-detail/charging-station-detail.component';

@NgModule({
  declarations: [
    ChargingStationListComponent,
    ChargingStationCreateComponent,
    ChargingStationDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChargingStationsRoutingModule
  ]
})
export class ChargingStationsModule { }