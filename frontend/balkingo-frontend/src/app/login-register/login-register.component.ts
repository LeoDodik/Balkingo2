import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Required for ngModel

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Important: include FormsModule
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  email: string = '';
  password: string = '';

  isValidEmail(): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(this.email);
  }

  onLogin(): void {
    if (!this.isValidEmail()) {
      alert('Unesite važeći email.');
      return;
    }

    console.log('Login:', this.email, this.password);
    // Add actual login logic here
  }
}
