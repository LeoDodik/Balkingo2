import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  isValidEmail(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.email);
  }

  onSubmit() {
    const payload = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:8080/api/auth/login', payload).subscribe({
      next: (res) => {
        if (res.status === 'NEW') {
          localStorage.setItem('userEmail', this.email); // Save email for profile setup
          this.router.navigateByUrl(res.redirect);
        } else if (res.status === 'EXISTS') {
          alert('Korisnik već postoji!');
        }
      },
      error: () => alert('Greška prilikom prijave.')
    });
  }
}
