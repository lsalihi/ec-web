import { createReducer, on } from '@ngrx/store';
import * as ChargingStationActions from './charging-station.actions';
import { ChargingStation } from 'app/features/charging-stations/model/charging-station.model';

export interface ChargingStationState {
  formDraft: Partial<ChargingStation> | null;
  savedStation: ChargingStation | null;
  error: any;
}

export const initialState: ChargingStationState = {
  formDraft: null,
  savedStation: null,
  error: null,
};

export const chargingStationReducer = createReducer(
  initialState,
  on(ChargingStationActions.saveFormDraft, (state, { formData }) => ({
    ...state,
    formDraft: { ...state.formDraft, ...formData },
  })),
  on(ChargingStationActions.submitFormSuccess, (state, { station }) => ({
    ...state,
    savedStation: station,
    formDraft: null,
    error: null,
  })),
  on(ChargingStationActions.submitFormFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);