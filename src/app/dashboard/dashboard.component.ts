import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NavigationComponent } from '../navigation/navigation.component';
import { UserInterface } from '../store/auth.reducer';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NavigationComponent, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  auth$: Observable<UserInterface | null>;
  private router = inject(Router);

  constructor(private store: Store<{auth: UserInterface|null}>) {
    this.auth$ = store.select('auth');
    // console.log(this.auth$.value);
    this.auth$.subscribe(() => {
      (value: UserInterface|null) => {
        console.log(';hahaha');
        console.log(value);
        if (value === null) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  ngOnInit() {
    this.auth$.subscribe(() => {
      (value: UserInterface|null) => {
        console.log(';hahaha');

        // console.log(value);
        // if (value === null) {
        //   this.router.navigate(['/']);
        // }
      }
    });
  }
}
