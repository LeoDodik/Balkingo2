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

  constructor(private http: HttpClient, private router: Router) {}

  onSave() {
    if (!this.nickname || !this.country || !this.experience) {
      alert('Molimo ispunite sva polja.');
      return;
    }

    const email = localStorage.getItem('userEmail');
    if (!email) {
      alert('Greška: Email nije pronađen.');
      return;
    }

    const profileData = {
      email: email,
      nickname: this.nickname.trim(),
      country: this.country,
      level: this.experience
    };

    this.http.post<any>('http://localhost:8080/api/auth/profile-setup', profileData).subscribe({
      next: (response) => {
        if (response.status === 'OK') {
          alert('Profil uspješno spremljen!');
          this.router.navigate(['/dashboard']); // ✅ Redirect to dashboard
        } else if (response.status === 'ERROR' && response.message === 'Nickname already taken') {
          alert('Greška: Nadimak je već zauzet.');
          this.nicknameTaken = true;
        } else {
          alert('Neočekivana greška.');
        }
      },
      error: () => {
        alert('Greška prilikom spremanja profila.');
      }
    });
  }
}
