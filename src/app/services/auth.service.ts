import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../features/auth/login-popup/login-popup.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private dialog: MatDialog) {}

  openLoginDialog() {
    this.dialog.open(LoginPopupComponent, {
      width: '400px',
      panelClass: 'login-dialog'
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