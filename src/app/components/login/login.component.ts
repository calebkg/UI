import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;

  constructor(private router: Router) {}

  onLogin() {
    // Simple validation - in real app, this would be proper authentication
    if (this.email && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }

  goToReset() {
    this.router.navigate(['/reset-password']);
  }
}