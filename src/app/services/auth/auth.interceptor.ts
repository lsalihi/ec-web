import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthToken } from './auth.selectors';
import { switchMap, take } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return store.select(selectAuthToken).pipe(
    take(1),
    switchMap(token => {
      let authReq = req.clone({
        withCredentials: true // This allows cookies to be sent with the request
      });

      if (token) {
        authReq = authReq.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
      }

      return next(authReq);
    })
  );
};