import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  onSubmit() {
    const payload = { email: this.email, password: this.password };
    console.log('Sending login payload:', payload);

    this.http.post('http://localhost:8080/api/auth/login', payload, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          alert(response);
          console.log('Response:', response);
        },
        error: (error) => {
          alert('Došlo je do pogreške.');
          console.error('Request failed:', error);
        }
      });
  }
}
