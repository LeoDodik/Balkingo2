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

  constructor(private http: HttpClient, private router: Router) {}

  onSave() {
    if (!this.nickname || !this.country || !this.experience) {
      alert('Molimo ispunite sva polja.');
      return;
    }

    const profileData = {
      nickname: this.nickname.trim(),
      country: this.country,
      experience: this.experience,
    };

    console.log('Profil:', profileData);
    alert('Profil uspješno spremljen!');

    // You can also save to backend here:
    // this.http.post('/api/profile', profileData).subscribe(() => this.router.navigate(['/']));
  }
}
