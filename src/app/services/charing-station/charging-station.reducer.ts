import { createReducer, on } from '@ngrx/store';
import * as ChargingStationActions from './charging-station.actions';
import { ChargingStation } from 'app/features/charging-stations/model/charging-station.model';

export interface ChargingStationState {
  formDraft: Partial<ChargingStation> | null;
  // Add other state properties as needed
}

export const initialState: ChargingStationState = {
  formDraft: null,
};

export const chargingStationReducer = createReducer(
  initialState,
  on(ChargingStationActions.saveFormDraft, (state, { formData }) => ({
    ...state,
    formDraft: { ...state.formDraft, ...formData },
  })),
  // Handle other actions
);