import { Component, inject } from '@angular/core';
import { createSelector, Store, createFeatureSelector } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NavigationComponent } from '../navigation/navigation.component';
import { UserInterface } from '../store/auth.reducer';

export const selectAuthState = createFeatureSelector<UserInterface|null>('auth');

@Component({
  selector: 'app-dashboard',
  imports: [NavigationComponent, AsyncPipe, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  auth$: Observable<UserInterface | null>;
  username$: Observable<string | null>;
  private router = inject(Router);
  
  constructor(private store: Store<{auth: UserInterface|null}>) {
    this.auth$ = store.select('auth');
    this.username$ = this.store.select(createSelector(selectAuthState, state => state?.username ?? ''));
    // console.log(this.auth$.value);
    // this.auth$.subscribe(() => {
    //   (value: UserInterface|null) => {
    //     this.user = value;
    //     console.log(';hahaha');
    //     console.log(value);
    //     if (value === null) {
    //       this.router.navigate(['/']);
    //     }
    //   }
    // });
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
