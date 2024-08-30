import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css'
})
export class LoginPopupComponent implements OnInit {
  hidePassword = true;

  showEmailForm = false;
  email: string = '';
  password: string = '';

  constructor(
    private dialogRef: MatDialogRef<LoginPopupComponent>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  loginWithGoogle(): void {
    /*this.authService.loginWithGoogle().then(() => {
      this.closePopup();
    }).catch(error => {
      console.error('Google login error:', error);
      // Handle error (show message to user)
    });*/
  }

  loginWithApple(): void {
    /*this.authService.loginWithApple().then(() => {
      this.closePopup();
    }).catch(error => {
      console.error('Apple login error:', error);
      // Handle error (show message to user)
    });*/
  }

  toggleEmailForm(): void {
    this.showEmailForm = !this.showEmailForm;
  }

  loginWithEmail(): void {
   /* if (this.email && this.password) {
      this.authService.loginWithEmail(this.email, this.password).then(() => {
        this.closePopup();
      }).catch(error => {
        console.error('Email login error:', error);
        // Handle error (show message to user)
      });
    } else {
      // Show error message to user about empty fields
    }*/
  }

  openTerms(): void {
    // Open terms of service in a new tab or modal
    window.open('/terms-of-service', '_blank');
  }

  openPrivacyPolicy(): void {
    // Open privacy policy in a new tab or modal
    window.open('/privacy-policy', '_blank');
  }

  openForgotPassword(): void {
    // Open forgot password dialog or navigate to forgot password page
    this.dialogRef.close('forgotPassword');
    // You might want to open another dialog or navigate to a new route here
  }

  openSignUp(): void {
    // Close this dialog and open sign up dialog or navigate to sign up page
    this.dialogRef.close('signUp');
    // You might want to open another dialog or navigate to a new route here
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
