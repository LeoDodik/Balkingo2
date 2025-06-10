import { Component } from '@angular/core';
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
  constructor(private router: Router) {}
  showMenu = false;

  goToUpoznavanje() {
    this.router.navigate(['/lektion/upoznavanje']);
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
    this.router.navigate(['/lektion/']);
  }


}
