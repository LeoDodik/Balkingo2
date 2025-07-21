import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lektion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lektion.component.html',
  styleUrls: ['./lektion.component.css']
})
export class LektionComponent implements OnInit {
  screenWidth = window.innerWidth;
  mobileMenuOpen = false;
  userLevel: string = ''; // Holds "pocetnik", "srednji", etc.

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserLevel();
  }

  fetchUserLevel() {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    this.http.get<any>(`http://localhost:8080/api/auth/user-by-email/${email}`).subscribe({
      next: (data) => {
        this.userLevel = data.level;
      },
      error: (err) => {
        console.error('Failed to load user level:', err);
      }
    });
  }

  // Navigation methods
  goToBasicGrammar() { this.router.navigate(['basic-grammar']); }
  goToModalVerbs() { this.router.navigate(['modal-verbs']); }
  goToUpoznavanje() { this.router.navigate(['/lektion/upoznavanje']); }
  goToLection() { this.router.navigate(['/lektion']); }
  goToWeather() { this.router.navigate(['/weather']); }
  goToHobbys() { this.router.navigate(['/hobbys']); }
  goToClothes(){this.router.navigate(['/clothes']); }
  goToFood(){this.router.navigate(['/food']); }
  goToColors(){this.router.navigate(['/colors']); }
  goToBody(){this.router.navigate(['/body']); }
  goToAnimals(){this.router.navigate(['/animals']); }
  goToFurniture(){this.router.navigate(['/furniture']); }
  goToProgress() { this.router.navigate(['/progress']); }
  goToFamily() { this.router.navigate(['/family']); }
  editProfile() { this.router.navigate(['/edit-profile']); }
  logout() {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
  goToNumbers() { this.router.navigate(['/brojevi']); }
  goToDays() { this.router.navigate(['/days']); }
  goToTime() { this.router.navigate(['/time']); }
  goToMonths() { this.router.navigate(['/months']); }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isMobileScreen(): boolean {
    return this.screenWidth <= 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    if (!this.isMobileScreen()) this.mobileMenuOpen = false;
  }
}
