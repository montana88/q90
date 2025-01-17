import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUser, clearUser } from '../store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'q90';
  private router = inject(Router);
  showLogin: boolean = true;

  constructor(private store: Store) {
    this.showLogin = this.router.url !== '/';
  }
  
  logout() {
    this.store.dispatch(clearUser());
    this.router.navigate(['/']);
  }
}
