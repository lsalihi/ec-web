// src/app/auth/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as AuthSelectors from './auth.selectors';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private authService : AuthService) {}

  canActivate(): Observable<boolean> {
    return this.store.select(AuthSelectors.selectIsAuthenticated).pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          //this.router.navigate(['/']);
          this.authService.openLoginDialog();
        }
      })
    );
  }
}