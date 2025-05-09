import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'; // Correct path
import { LoginRegisterComponent } from './login-register/login-register.component'; // Correct path

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginRegisterComponent }
];
