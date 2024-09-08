import { createAction, props } from '@ngrx/store';
import { ChargingStation } from 'app/features/charging-stations/model/charging-station.model';

export const saveFormDraft = createAction(
  '[Charging Station] Save Form Draft',
  props<{ formData: Partial<ChargingStation> }>()
);

export const loadFormDraft = createAction('[Charging Station] Load Form Draft');

export const submitForm = createAction(
  '[Charging Station] Submit Form',
  props<{ formData: ChargingStation }>()
);

export const submitFormSuccess = createAction(
  '[Charging Station] Submit Form Success',
  props<{ station: ChargingStation }>()
);

export const submitFormFailure = createAction(
  '[Charging Station] Submit Form Failure',
  props<{ error: any }>()
);