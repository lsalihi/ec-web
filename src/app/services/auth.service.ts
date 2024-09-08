import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../features/auth/login-popup/login-popup.component';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  store = inject(Store);
  private apiUrl = '/idp'; // identity provider

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/uaa/token`, { email, password });
  }


  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post('/uaa/token/refresh', { refreshToken }).pipe(
      map((response: any) => {
        this.store.dispatch(AuthActions.setTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        }));
        return response;
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  openLoginDialog() {
    this.dialog.open(LoginPopupComponent, {
     // width: '400px',
     // panelClass: 'login-dialog'
    });
  }

  openSignUpDialog() {
    // Implement this method to open a sign-up dialog or navigate to a sign-up page
    console.log('Open sign-up dialog or navigate to sign-up page');
  }

  loginWithGoogle() {
    // Implement Google login logic
    console.log('Logging in with Google');
  }

  loginWithApple() {
    // Implement Apple login logic
    console.log('Logging in with Apple');
  }

  loginWithEmail(email: string, password: string) {
    // Implement email login logic
    console.log('Logging in with email:', email);
  }

  signUp(email: string, password: string) {
    // Implement sign up logic
    console.log('Signing up with email:', email);
  }
}