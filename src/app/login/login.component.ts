import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { addUser } from '../store/auth.actions';
import { UserInterface } from '../store/auth.reducer';

// structure login response data
interface LoginResponseData {
  "data": UserInterface,
  "success": boolean,
  "performanceCost": number,
  "source": string,
  "statusCode": number,
  "resultMessages": [
    {
      "code": number,
      "message": string,
      "innerMessage": number|null
    }
  ]
}

/**
 * login page for basic auth
 */
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  error: boolean = false;
  faSpinner = faSpinner;
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * on form submit this method will post an request to the backend
   */
  onSubmit() {
    this.error = false;

    if (this.loginForm.valid) {
      this.loading = true;
      const formData = this.loginForm.value;
      const subscription = this.httpClient.post('http://localhost:3000/auth/login', {
        username: formData.username,
        password: formData.password,
      }).subscribe({
        next: (resData: Object) => {
          
          // cast Object to LoginResponseData
          // this is needed cast resData expect an Object. but the code below expect LoginResponseData
          const loginResData = <LoginResponseData> resData;

          if (loginResData.success) {
            this.store.dispatch(addUser(loginResData.data));
            this.router.navigate(['/dashboard']);
          } else {
            this.error = true;
          }

          this.loading = false;
        }
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      })
    } else {
      console.log('Form is invalid');
    }
  }
}
