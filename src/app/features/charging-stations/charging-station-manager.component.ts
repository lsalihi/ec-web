import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-charging-station-manager',
  template: `
    <div class="manager-view">
      <app-manager-header></app-manager-header>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .manager-view {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
  `]
})
export class ChargingStationManagerComponent { }