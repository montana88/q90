import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addUser } from '../store/auth.actions';
import { UserInterface } from '../store/auth.reducer';
import { Observable } from 'rxjs';

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

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  error: boolean = false;
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.error = false;

    if (this.loginForm.valid) {
      this.loading = true;
      const loginData = this.loginForm.value;
      const subscription = this.httpClient.post('http://localhost:3000/auth/login', {
        username: loginData.username,
        password: loginData.password,
      }).subscribe({
        next: (resData: Object) => {
          const loginResData = <LoginResponseData> resData; // cast Object to LoginResponseData

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
