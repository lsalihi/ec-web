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
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { ConnectorsComponent } from './components/connectors/connectors.component';
import { AvailabilitiesComponent } from './components/availabilities/availabilities.component';
import { ImagesContactComponent } from './components/images-contact/images-contact.component';
import { AvailabilityDialogComponent } from './components/availability-dialog/availability-dialog.component';
import { LocationComponent } from './components/location/location.component';
import { FormInputComponent } from 'app/layouts/common/form-input.component';
import { FormSelectComponent } from 'app/layouts/common/form-select.component';
import { StoreModule } from '@ngrx/store';
import { chargingStationReducer } from 'app/services/charging-station/charging-station.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ChargingStationEffects } from 'app/services/charging-station/charging-station.effects';
import { AuthGuard } from 'app/services/auth/auth.guard';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard],
  declarations: [
    ManagerHeaderComponent,
    ChargingStationListComponent,
    ChargingStationCreateComponent,
    ChargingStationDetailComponent,
    ChargingStationManagerComponent,
    BasicInfoComponent,
    LocationComponent,
    //OpenLocationComponent,
    ConnectorsComponent,
    AvailabilitiesComponent,
    ImagesContactComponent,
    AvailabilityDialogComponent,

    FormInputComponent,
    FormSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ChargingStationsRoutingModule,
    StoreModule.forFeature('chargingStation', chargingStationReducer),
    EffectsModule.forFeature([ChargingStationEffects])
  ],
  exports: [
    FormInputComponent,
    FormSelectComponent
  ],
})
export class ChargingStationsModule { }