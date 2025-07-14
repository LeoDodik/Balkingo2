import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.css'],
})
export class ProfileSetupComponent {
  nickname = '';
  country = '';
  experience = '';
  nicknameTaken = false;
  errorMessage = '';
  showToast = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSave() {
    this.nicknameTaken = false;
    this.errorMessage = '';
    this.showToast = false;

    if (!this.nickname || !this.country || !this.experience) {
      this.showError('Molimo ispunite sva polja.');
      return;
    }

    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.showError('Nema spremljenog emaila.');
      return;
    }

    const profileData = {
      email: email,
      nickname: this.nickname.trim(),
      country: this.country,
      level: this.experience,
    };

    this.http.post<any>('http://localhost:8080/api/auth/profile-setup', profileData).subscribe({
      next: (response) => {
        if (response.status === 'OK') {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        if (error.error?.message === 'Nickname already taken') {
          this.nicknameTaken = true;
          this.showError('Nadimak je već zauzet.');
        } else {
          this.showError('Greška pri spremanju profila.');
        }
      },
    });
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
