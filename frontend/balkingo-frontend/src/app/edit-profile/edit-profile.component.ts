import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  email = '';
  nickname = '';
  country = '';
  experience = '';

  nicknameTaken = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('userEmail');
    if (!savedEmail) {
      this.errorMessage = 'Korisnički email nije pronađen.';
      return;
    }

    this.email = savedEmail;

    this.http.get<any>(`http://localhost:8080/api/auth/user-by-email/${savedEmail}`)
      .subscribe({
        next: (user) => {
          this.nickname = user.nickname ?? '';
          this.country = user.country ?? '';
          // If backend returns "level", map it to experience
          this.experience = user.level ?? user.experience ?? '';
        },
        error: () => {
          this.errorMessage = 'Greška pri dohvaćanju korisničkih podataka.';
        }
      });
  }

  onSave(): void {
    this.nicknameTaken = false;
    this.errorMessage = '';

    if (!this.nickname || !this.country || !this.experience) {
      this.errorMessage = 'Molimo ispunite sva polja.';
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
          } else {
            this.errorMessage = 'Greška pri spremanju podataka.';
          }
        }
      });
  }
}
