// src/app/state/state-persistence.meta-reducer.ts

import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AuthState } from './auth/auth.reducer';

export function stateLocalStorageMetaReducer(reducer: ActionReducer<AuthState>): ActionReducer<AuthState> {
  return function(state, action) {
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('auth');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('auth');
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem('auth', JSON.stringify(nextState));
    return nextState;
  };
}