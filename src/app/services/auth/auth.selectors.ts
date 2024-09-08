import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.accessToken ?? null
);

export const selectRefreshToken = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.refreshToken ?? null
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.user ?? null
);

export const selectIsAuthenticated = createSelector(
  selectAccessToken,
  (token: string | null) => {
    console.log('selectIsAuthenticated called, token:', token);
    return !!token;
  }
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.loading ?? false
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state?.error ?? null
);

// Keeping selectAuthToken for backwards compatibility
export const selectAuthToken = selectAccessToken;