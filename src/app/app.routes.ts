import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  {
    path: 'charging-stations',
    loadChildren: () => import('./features/charging-stations/charging-stations.module').then(m => m.ChargingStationsModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' }
];