import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    FormsModule
  ],
  templateUrl: './login-popup.component.html',
  styleUrl: './login-popup.component.css'
})
export class LoginPopupComponent implements OnInit {
  showEmailForm = false;
  newAccount = false;
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginPopupComponent>,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      rememberMe: [false]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loginForm.get('confirmPassword')?.setValidators(this.newAccount ? [Validators.required] : null);
    this.loginForm.get('confirmPassword')?.updateValueAndValidity();
  }

  toggleNewAccount(value: boolean): void {
    this.newAccount = value;
    this.loginForm.get('confirmPassword')?.setValidators(this.newAccount ? [Validators.required] : null);
    this.loginForm.get('confirmPassword')?.updateValueAndValidity();
  }

  goBack(): void {
    this.showEmailForm = false;
    this.newAccount = false;
    this.loginForm.reset();
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      if (this.newAccount) {
        this.signUp();
      } else {
        this.loginWithEmail();
      }
    }
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    // Implement Google login logic
  }

  loginWithApple(): void {
    this.isLoading = true;
    // Implement Apple login logic
  }

  toggleEmailForm(): void {
    this.showEmailForm = !this.showEmailForm;
  }

  loginWithEmail(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password, rememberMe } = this.loginForm.value;
      // Implement email login logic
    } else {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  openTerms(event: Event): void {
    event.preventDefault();
    window.open('/terms-of-service', '_blank');
  }

  openPrivacyPolicy(event: Event): void {
    event.preventDefault();
    window.open('/privacy-policy', '_blank');
  }

  openForgotPassword(event: Event): void {
    event.preventDefault();
    this.dialogRef.close('forgotPassword');
    // You might want to open another dialog or navigate to a new route here
  }

  openSignUp(event: Event): void {
    this.newAccount = true;
    //event.preventDefault();
    //this.dialogRef.close('signUp');
    // You might want to open another dialog or navigate to a new route here
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  changeLanguage(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    //this.translateService.use(selectedLanguage);
  }

  private handleError(context: string, error: any): void {
    console.error(context, error);
    this.errorMessage = 'An error occurred. Please try again.';
    // You might want to show more specific error messages based on the error type
  }

  signUp(): void {
    // Implement sign up logic
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {'mismatch': true};
  }
}
