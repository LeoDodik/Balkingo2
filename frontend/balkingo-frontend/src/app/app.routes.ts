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
  },
  {
    path: 'clothes',
    loadComponent: () => import('./clothes/clothes.component').then(m => m.ClothesComponent)
  },
  {
    path: 'food',
    loadComponent: () => import('./food/food.component').then(m => m.FoodComponent)
  },
  {
    path: 'colors',
    loadComponent: () => import('./colors/colors.component').then(m => m.ColorsComponent)
  },
  {
    path: 'furniture',
    loadComponent: () => import('./furniture/furniture.component').then(m => m.FurnitureComponent)
  },
  {
    path: 'animals',
    loadComponent: () => import('./animals/animals.component').then(m => m.AnimalsComponent)
  },
  {
    path: 'body',
    loadComponent: () => import('./body/body.component').then(m => m.BodyComponent)
  },
  {
    path: 'basic-grammar',
    loadComponent: () => import('./basic-grammar/basic-grammar.component').then(m => m.BasicGrammarComponent)
  },
  {
    path: 'modal-verbs',
    loadComponent: () => import('./modal-verbs/modal-verbs.component').then(m => m.ModalVerbsComponent)
  }

];
