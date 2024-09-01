import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ec-web';

  public constructor(private store: Store) {}
}
