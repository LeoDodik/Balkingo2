import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgForOf, NgClass, TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, NgForOf, NgClass, TitleCasePipe],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  showMenu = false;
  mobileMenuOpen = false;
  screenWidth = window.innerWidth;

  userLevel: string = ''; // will be loaded from backend
  completedLections: string[] = [];
  filteredLections: { name: string; level: string }[] = [];

  lections = [
    { name: 'upoznavanje', level: 'pocetnik' },
    { name: 'brojevi', level: 'pocetnik' },
    { name: 'mjeseci', level: 'pocetnik' },
    { name: 'dani u tjednu', level: 'pocetnik' },
    { name: 'vrijeme', level: 'pocetnik' },
    { name: 'klima', level: 'pocetnik' },
    { name: 'aktivnosti', level: 'srednji' }
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    // Fetch profile info
    this.http.get<any>(`http://localhost:8080/api/auth/user-by-email/${email}`).subscribe({
      next: (user) => {
        this.userLevel = user.level || 'pocetnik'; // fallback just in case

        // Load completed lessons
        this.completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

        // Filter lections by level
        this.filteredLections = this.lections.filter(l => l.level === this.userLevel);

        // Update progress bar
        this.updateProgressBar();
      },
      error: () => {
        console.error('Failed to fetch user data');
        this.router.navigate(['/login']);
      }
    });
  }

  updateProgressBar() {
    const completedCount = this.filteredLections.filter(l =>
      this.completedLections.includes(l.name)
    ).length;

    const percent = Math.floor((completedCount / this.filteredLections.length) * 100);
    const bar = document.getElementById('progressBar');
    if (bar) {
      bar.style.width = percent + '%';
    }
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
