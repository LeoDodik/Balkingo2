import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  showMenu = false;
  mobileMenuOpen = false;
  screenWidth = window.innerWidth;

  userLevel: string = 'pocetnik';
  userEmail: string = '';
  userNickname: string = '';
  userCountry: string = '';

  completedLections: string[] = [];
  filteredLections: { name: string; level: string }[] = [];
  isLevelCompleted = false;

  nextLevelMap: { [key: string]: string } = {
    pocetnik: 'srednji',
    srednji: 'napredni'
  };

  lections = [
    { name: 'upoznavanje', level: 'pocetnik' },
    { name: 'brojevi', level: 'pocetnik' },
    { name: 'mjeseci', level: 'pocetnik' },
    { name: 'dani u tjednu', level: 'pocetnik' },
    { name: 'vrijeme', level: 'pocetnik' },
    { name: 'klima', level: 'pocetnik' },
    { name: 'boje', level: 'pocetnik' },
    { name: 'tijelo', level: 'pocetnik' },
    { name: 'životinje', level: 'pocetnik' },
    { name: 'namještaj', level: 'pocetnik' },
    { name: 'aktivnosti', level: 'srednji' },
    { name: 'familija', level: 'srednji' },
    { name: 'odjeća/obuća', level: 'srednji' },
    { name: 'hrana/piće', level: 'srednji' },
    { name: 'osnovna gramatika', level: 'srednji' },
    { name: 'modalni glagoli', level: 'srednji' },
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');
    this.userEmail = localStorage.getItem('userEmail') || '';

    if (this.userEmail) {
      this.http.get<any>(`http://localhost:8080/api/auth/user-by-email/${this.userEmail}`).subscribe({
        next: (user) => {
          this.userLevel = user.level || 'pocetnik';
          this.userNickname = user.nickname || '';
          this.userCountry = user.country || '';
          localStorage.setItem('userLevel', this.userLevel);
          this.loadLections();
        },
        error: (err) => {
          console.error('Failed to load user level from backend', err);
          this.userLevel = localStorage.getItem('userLevel') || 'pocetnik';
          this.loadLections();
        }
      });
    } else {
      this.userLevel = localStorage.getItem('userLevel') || 'pocetnik';
      this.loadLections();
    }
  }

  loadLections() {
    this.filteredLections = this.lections.filter(l => l.level === this.userLevel);
    this.isLevelCompleted = this.filteredLections.every(l => this.completedLections.includes(l.name));
    this.updateProgressBar();
  }

  updateProgressBar() {
    const bar = document.getElementById('progressBar');
    const percent = Math.floor(
      (this.filteredLections.filter(l => this.completedLections.includes(l.name)).length /
        this.filteredLections.length) * 100
    );
    if (bar) bar.style.width = percent + '%';
  }

  advanceLevel() {
    const nextLevel = this.nextLevelMap[this.userLevel];
    if (!nextLevel) return;

    const payload = {
      email: this.userEmail,
      nickname: this.userNickname,
      country: this.userCountry,
      level: nextLevel
    };

    this.http.put('http://localhost:8080/api/auth/edit-profile', payload).subscribe({
      next: () => {
        console.log('Level updated in backend.');
        this.userLevel = nextLevel;
        localStorage.setItem('userLevel', nextLevel);
        this.loadLections();
      },
      error: err => {
        console.error('Failed to update level:', err);
        alert('Greška pri ažuriranju nivoa. Pokušaj ponovo.');
      }
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  goToLection() {
    this.router.navigate(['/lektion']);
  }

  goToProgress() {
    this.router.navigate(['/progress']);
  }

  isMobileScreen(): boolean {
    return this.screenWidth <= 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    if (!this.isMobileScreen()) {
      this.mobileMenuOpen = false;
    }
  }
}
