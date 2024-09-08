import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargingStationManagerComponent } from './charging-station-manager.component';
import { ChargingStationListComponent } from './charging-station-list/charging-station-list.component';
import { ChargingStationCreateComponent } from './charging-station-create/charging-station-create.component';
import { ChargingStationDetailComponent } from './charging-station-detail/charging-station-detail.component';
import { AuthGuard } from 'app/services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ChargingStationManagerComponent,
    canActivate: [AuthGuard], // Apply AuthGuard to the parent route
    children: [
      { path: '', component: ChargingStationListComponent },
      { path: 'create', component: ChargingStationCreateComponent },
      { path: ':id', component: ChargingStationDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargingStationsRoutingModule { }