import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    accessToken: string;
    refreshToken: string;
  } | null;
  loading: boolean;
  error: any;
}

export const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  loading: false,
  error: null
};

/*
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.setTokens, (state, { accessToken, refreshToken }) => ({...state, accessToken, refreshToken})),
  on(AuthActions.login, (state) => ({ ...state, loading: true })),
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(AuthActions.logout, () => initialAuthState),
  on(AuthActions.registerUser, state => ({ ...state, loading: true })),
  on(AuthActions.registerUserSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(AuthActions.registerUserFailure, (state, { error }) => ({ ...state, error, loading: false }))
); */
export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { accessToken, refreshToken }) => ({
    ...state,
    accessToken,
    refreshToken,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    error
  })),
  on(AuthActions.setTokens, (state, { accessToken, refreshToken }) => ({ //to remove
    ...state,
    accessToken,
    refreshToken
  })),
  on(AuthActions.logout, () => ({
    ...initialState
  }))
);