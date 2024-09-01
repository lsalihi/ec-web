import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, loading: true })),
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(AuthActions.logout, state => ({ ...state, user: null })),
  on(AuthActions.registerUser, state => ({ ...state, loading: true })),
  on(AuthActions.registerUserSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(AuthActions.registerUserFailure, (state, { error }) => ({ ...state, error, loading: false }))
);