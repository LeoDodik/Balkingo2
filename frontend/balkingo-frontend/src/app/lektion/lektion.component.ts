import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lektion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lektion.component.html',
  styleUrls: ['./lektion.component.css']
})
export class LektionComponent {
  screenWidth = window.innerWidth;
  mobileMenuOpen = false;

  constructor(private router: Router) {}

  // Navigation methods
  goToUpoznavanje() {
    this.router.navigate(['/lektion/upoznavanje']);
  }

  goToLection() {
    this.router.navigate(['/lektion']);
  }

  editProfile() {
    this.router.navigate(['/profile-setup']);
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  // Toggle for mobile sidebar
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isMobileScreen(): boolean {
    return this.screenWidth <= 768;
  }

  // Update screen width on resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;

    // Close mobile menu when resizing to desktop
    if (!this.isMobileScreen()) {
      this.mobileMenuOpen = false;
    }
  }
}
