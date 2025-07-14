import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  trigger,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class EditProfileComponent implements OnInit {
  email = '';
  nickname = '';
  country = '';
  experience = '';

  nicknameTaken = false;
  errorMessage = '';
  showToast = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('userEmail');
    if (!savedEmail) {
      this.showError('Korisnički email nije pronađen.');
      return;
    }

    this.email = savedEmail;

    this.http.get<any>(`http://localhost:8080/api/auth/user-by-email/${savedEmail}`)
      .subscribe({
        next: (user) => {
          this.nickname = user.nickname ?? '';
          this.country = user.country ?? '';
          this.experience = user.level ?? user.experience ?? '';
        },
        error: () => {
          this.showError('Greška pri dohvaćanju korisničkih podataka.');
        }
      });
  }

  onSave(): void {
    this.nicknameTaken = false;
    this.errorMessage = '';
    this.showToast = false;

    if (!this.nickname || !this.country || !this.experience) {
      this.showError('Molimo ispunite sva polja.');
      return;
    }

    const payload = {
      email: this.email,
      nickname: this.nickname.trim(),
      country: this.country,
      level: this.experience,
    };

    this.http.put<any>('http://localhost:8080/api/auth/edit-profile', payload)
      .subscribe({
        next: (res) => {
          if (res.status === 'OK') {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          if (err.error?.message === 'Nickname already taken') {
            this.nicknameTaken = true;
            this.showError('');
          } else {
            this.showError('Greška pri spremanju podataka.');
          }
        }
      });
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
