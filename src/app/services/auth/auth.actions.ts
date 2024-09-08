import { createAction, props } from '@ngrx/store';

export const setTokens = createAction(
  '[Auth] Set Tokens',
  props<{ accessToken: string; refreshToken: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  //props<{ user: any }>()
  props<{ accessToken: string; refreshToken: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const registerUser = createAction(
  '[Auth] Register User',
  props<{ user: any }>()
);

export const registerUserSuccess = createAction(
  '[Auth] Register User Success',
  props<{ user: any }>()
);

export const registerUserFailure = createAction(
  '[Auth] Register User Failure',
  props<{ error: any }>()
);