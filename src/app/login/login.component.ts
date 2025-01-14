import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm: FormGroup;
  private httpClient = inject(HttpClient);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('hahah');
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.httpClient.post('http://localhost:3000/auth/login', {
        username: loginData.username,
        password: loginData.password,
      });
      console.log('Login successful:', loginData);
      // Add logic to handle authentication (e.g., API call)
    } else {
      console.log('Form is invalid');
    }
  }
}
