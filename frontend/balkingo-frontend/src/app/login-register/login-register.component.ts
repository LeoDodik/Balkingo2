import { Component } from '@angular/core';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  email: string = '';
  password: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  confirmPassword: string = '';

  onLogin() {
    console.log('Login:', this.email, this.password);
  }

  onRegister() {
    if (this.registerPassword === this.confirmPassword) {
      console.log('Register:', this.registerEmail, this.registerPassword);
    } else {
      alert('Passwords do not match!');
    }
  }
}
