import { Component } from '@angular/core';
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

  constructor(private router: Router) {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
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

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isMobileScreen(): boolean {
    return window.innerWidth <= 768;
  }

}

