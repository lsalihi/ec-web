import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChargingStationsRoutingModule } from './charging-stations-routing.module';
import { ChargingStationListComponent } from './charging-station-list/charging-station-list.component';
import { ChargingStationCreateComponent } from './charging-station-create/charging-station-create.component';
import { ChargingStationDetailComponent } from './charging-station-detail/charging-station-detail.component';
import { ManagerHeaderComponent } from 'app/layouts/manager-header/manager-header.component';
import { ChargingStationManagerComponent } from './charging-station-manager.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ManagerHeaderComponent,
    ChargingStationListComponent,
    ChargingStationCreateComponent,
    ChargingStationDetailComponent,
    ChargingStationManagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ChargingStationsRoutingModule
  ],
  exports: [
    ManagerHeaderComponent,
    ChargingStationListComponent,
    ChargingStationCreateComponent,
    ChargingStationDetailComponent,
    ChargingStationManagerComponent
  ],
})
export class ChargingStationsModule { }