import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as AuthActions from '../../../services/auth/auth.actions';
import * as AuthSelectors from '../../../services/auth/auth.selectors';


@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent implements OnInit {
  showEmailForm = false;
  newAccount = false;
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginPopupComponent>,
    private store: Store
  ) {
    this.isLoading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.errorMessage$ = this.store.select(AuthSelectors.selectAuthError);
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
    this.updateFormValidation();
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      rememberMe: [false]
    });
  }

  updateFormValidation(): void {
    const confirmPasswordControl = this.loginForm.get('confirmPassword');
    if (this.newAccount) {
      confirmPasswordControl?.setValidators([Validators.required, this.passwordMatchValidator.bind(this)]);
    } else {
      confirmPasswordControl?.clearValidators();
    }
    confirmPasswordControl?.updateValueAndValidity();
    this.loginForm.updateValueAndValidity();
  }

  toggleNewAccount(value: boolean): void {
    this.newAccount = value;
    this.updateFormValidation();
  }

  goBack(): void {
    this.showEmailForm = false;
    this.newAccount = false;
    this.loginForm.reset();
    this.updateFormValidation();
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      if (this.newAccount) {
        this.store.dispatch(AuthActions.registerUser({ user: { email, password } }));
      } else {
        this.store.dispatch(AuthActions.login({ email, password }));
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  toggleEmailForm(): void {
    this.showEmailForm = !this.showEmailForm;
    this.newAccount = false;
    this.updateFormValidation();
  }

  passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = this.loginForm.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  loginWithGoogle(): void {
    //this.store.dispatch(AuthActions.loginWithGoogle());
  }

  loginWithApple(): void {
    //this.store.dispatch(AuthActions.loginWithApple());
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
    // You might want to dispatch an action here to handle forgot password
  }

  openSignUp(event: Event): void {
    this.newAccount = true;
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}