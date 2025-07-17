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
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./progress/progress.component').then(m => m.ProgressComponent)
  },
  {
    path: 'brojevi',
    loadComponent: () => import('./brojevi/brojevi.component').then(m => m.BrojeviComponent)
  },
  {
    path: 'days',
    loadComponent: () => import('./days/days.component').then(m => m.DaysComponent)
  },
  {
    path: 'time',
    loadComponent: () => import('./time/time.component').then(m => m.TimeComponent)
  },
  {
    path: 'months',
    loadComponent: () => import('./months/months.component').then(m => m.MonthsComponent)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
  },
  {
    path: 'weather',
    loadComponent: () => import('./weather/weather.component').then(m => m.WeatherComponent)
  },
  {
    path: 'hobbys',
    loadComponent: () => import('./hobbys/hobbys.component').then(m => m.HobbysComponent)
  },
  {
    path: 'family',
    loadComponent: () => import('./family/family.component').then(m => m.FamilyComponent)
  }

];
