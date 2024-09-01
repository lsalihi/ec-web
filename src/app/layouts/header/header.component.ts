import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  openLoginPopup(event: Event) {
    event.preventDefault(); // Prevent the default link behavior
    this.authService.openLoginDialog();
  }
}
