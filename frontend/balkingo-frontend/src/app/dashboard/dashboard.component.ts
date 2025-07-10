import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showMenu = false;
  mobileMenuOpen = false;
  screenWidth = window.innerWidth;

  constructor(private router: Router) {}

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
