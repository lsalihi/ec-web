import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ChargingStationActions from './charging-station.actions';
import { ChargingStationService } from '../charging-station.service';

@Injectable()
export class ChargingStationEffects {

  private actions$ = inject(Actions);
  private chargingStationService = inject(ChargingStationService);

  submitForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChargingStationActions.submitForm),
      mergeMap(({ formData }) =>
        this.chargingStationService.createChargingStation(formData).pipe(
          map(savedStation => ChargingStationActions.submitFormSuccess({ station: savedStation })),
          catchError(error => of(ChargingStationActions.submitFormFailure({ error })))
        )
      )
    )
  );
}