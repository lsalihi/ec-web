import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-header',
  standalone: false,
  templateUrl: './manager-header.component.html',
  styleUrl: './manager-header.component.css'
})
export class ManagerHeaderComponent {

  managerName = 'lsalihi'

  openProfileMenu(event: Event) {
    event.preventDefault(); // Prevent the default link behavior
  }
}
