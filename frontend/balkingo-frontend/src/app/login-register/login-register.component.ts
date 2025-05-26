import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ Fixed

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

    this.http.post('http://localhost:8080/api/auth/login', payload, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          alert(response);
          console.log('Response:', response);

          if (response === 'User registered successfully') {
            // Store email and redirect
            localStorage.setItem('email', this.email);
            window.location.href = '/profile-setup'; // or use router
          }
        },
        error: (error) => {
          alert('Došlo je do pogreške.');
          console.error('Request failed:', error);
        }
      });
  }
}
