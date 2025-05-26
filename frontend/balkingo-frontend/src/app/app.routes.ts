import { Routes } from '@angular/router';

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
  }
];
