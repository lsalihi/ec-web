// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap, take, catchError } from 'rxjs/operators';
import * as AuthSelectors from './auth.selectors';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const authInterceptor : HttpInterceptorFn =  (req, next) => {
  const store = inject(Store);
  const authService = inject(AuthService);

  const isApiRequest = req.url.startsWith('/assets/') ||
    req.url.includes('api.geoapify.com') ||
    req.url.includes('tile.openstreetmap.org');

  if (isApiRequest) {
    // If it's not an API request, proceed without modification
    return next(req);
  }

  return store.select(AuthSelectors.selectAccessToken).pipe(
    take(1),
    switchMap(token => {
      if (token) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }
      return next(req).pipe(
        catchError(error => {
          if (error.status === 401) {
            return store.select(AuthSelectors.selectRefreshToken).pipe(
              take(1),
              switchMap(refreshToken => {
                if (refreshToken) {
                  return authService.refreshToken(refreshToken).pipe(
                    switchMap(() => next(req))
                  );
                }
                // Handle case where refresh token is not available
                return next(req);
              })
            );
          }
          throw error;
        })
      );
    })
  );
};
