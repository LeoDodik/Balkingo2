import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  lections = ['upoznavanje', 'brojevi', 'konjugacija'];
  completedLections: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');
    const percent = Math.floor((this.completedLections.length / this.lections.length) * 100);
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = percent + '%';
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  editProfile() {
    this.router.navigate(['/profile-setup']);
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
