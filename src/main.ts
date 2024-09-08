import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { chargingStationReducer } from 'app/services/charging-station/charging-station.reducer';
import { ChargingStationEffects } from 'app/services/charging-station/charging-station.effects';
import { authReducer } from 'app/services/auth/auth.reducer';
import { stateLocalStorageMetaReducer } from 'app/services/state-persistence.meta-reducer';
export const metaReducers: MetaReducer<any>[] = [stateLocalStorageMetaReducer];

bootstrapApplication(AppComponent, {
  ...appConfig, // Spread the existing appConfig
  providers: [
    ...(appConfig.providers || []), // Spread existing providers, if any
    importProvidersFrom(
      StoreModule.forRoot({ chargingStation: chargingStationReducer }),
      StoreModule.forRoot({ auth: authReducer }, { metaReducers }),
      //StoreModule.forRoot({ auth: authReducer }),
      EffectsModule.forRoot([ChargingStationEffects])
    )
  ]
}).catch(err => console.error(err));