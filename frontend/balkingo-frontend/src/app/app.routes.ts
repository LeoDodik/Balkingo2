import { Routes } from '@angular/router';
import {UpoznavanjeComponent} from './upoznavanje/upoznavanje.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/landing-page.component').then(m => m.LandingPageComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login-register/login-register.component').then(m => m.LoginRegisterComponent),
  },
  {
    path: 'profile-setup',
    loadComponent: () =>
      import('./profile-setup/profile-setup.component').then(m => m.ProfileSetupComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'lektion',
    loadComponent: () =>
      import('./lektion/lektion.component').then(m => m.LektionComponent),
  },
  {
    path: 'lektion/upoznavanje',
    loadComponent: () =>
      import('./upoznavanje/upoznavanje.component').then(m => m.UpoznavanjeComponent),
  }
];
