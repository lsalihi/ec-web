import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';
import * as AuthSelectors from '../../services/auth/auth.selectors';
import * as AuthActions from '../../services/auth/auth.actions';

@Component({
  selector: 'app-manager-header',
  standalone: false,
  templateUrl: './manager-header.component.html',
  styleUrl: './manager-header.component.css'
})
export class ManagerHeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  user$: Observable<any>;
  showProfileMenu = false;

  store = inject(Store);

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.isAuthenticated$.subscribe(isAuth => {
      console.log('isAuthenticated in component:', isAuth);
    });
  }

  openLoginPopup(event: Event) {
    event.preventDefault();
    this.authService.openLoginDialog();
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  closeProfileMenu() {
    this.showProfileMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as Element).closest('.profile-dropdown')) {
      this.closeProfileMenu();
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(AuthActions.logout());
    this.closeProfileMenu();
  }
}
