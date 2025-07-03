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

  toastMessage = '';
  toastVisible = false;

  constructor(private http: HttpClient, private router: Router) {}

  isValidEmail(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.email);
  }

  showToast(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;

    setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

  onSubmit() {
    const payload = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:8080/api/auth/login', payload).subscribe({
      next: (res) => {
        if (res.status === 'NEW') {
          localStorage.setItem('userEmail', this.email);
          this.router.navigateByUrl(res.redirect);
        } else if (res.status === 'EXISTS') {
          this.showToast('Korisnik već postoji!');
        }
      },
      error: () => {
        this.showToast('Greška prilikom prijave.');
      }
    });
  }
}
