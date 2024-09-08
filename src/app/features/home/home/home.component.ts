import { Component, inject, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthSelectors from 'app/services/auth/auth.selectors';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  store = inject(Store);
  isAuthenticated$: Observable<boolean>;

  ngOnInit(): void {
    //this.isAuthenticated$ = this.store.select(AuthSelectors.selectAccessToken);
    this.isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
  }




}
