import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  // Effect to handle login
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  // Effect to handle successful login (side effect only, no dispatch)
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          localStorage.setItem('user', JSON.stringify(user));
        })
      ),
    { dispatch: false }
  );

  // Effect to handle logout (side effect only, no dispatch)
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
        })
      ),
    { dispatch: false }
  );

  // Effect to handle user registration
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      switchMap(({ user }) =>
        this.authService.register(user).pipe(
          map(registeredUser => AuthActions.registerUserSuccess({ user: registeredUser })),
          catchError(error => of(AuthActions.registerUserFailure({ error: error.message })))
        )
      )
    )
  );
}

export const authEffects = [AuthEffects];