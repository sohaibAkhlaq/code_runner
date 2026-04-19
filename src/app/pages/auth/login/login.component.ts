import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router      = inject(Router);

  emailValue    = '';
  passwordValue = '';

  isLoading     = signal(false);
  showPassword  = signal(false);
  emailError    = signal('');
  passwordError = signal('');
  globalError   = signal('');

  panelFeatures = [
    { icon: '⚡', text: 'Sub-50ms code execution engine' },
    { icon: '🧠', text: 'AI-powered hints and analysis' },
    { icon: '📊', text: 'Real-time progress analytics' },
    { icon: '🏆', text: 'Global leaderboard competition' },
  ];

  async onSubmit(): Promise<void> {
    this.emailError.set('');
    this.passwordError.set('');
    this.globalError.set('');

    if (!this.emailValue) { this.emailError.set('Email is required'); return; }
    if (!this.emailValue.includes('@')) { this.emailError.set('Enter a valid email address'); return; }
    if (!this.passwordValue) { this.passwordError.set('Password is required'); return; }
    if (this.passwordValue.length < 6) { this.passwordError.set('Password must be at least 6 characters'); return; }

    this.isLoading.set(true);
    try {
      const ok = await this.authService.login(this.emailValue, this.passwordValue);
      if (ok) {
        this.router.navigate(['/dashboard']);
      } else {
        this.globalError.set('Invalid email or password. Please try again.');
      }
    } catch {
      this.globalError.set('An error occurred. Please try again later.');
    } finally {
      this.isLoading.set(false);
    }
  }

  loginWithGoogle(): void {
    // In MEAN stack: would call Angular HttpClient → Express API → Google OAuth
    this.globalError.set('Google OAuth requires backend API. Using mock login...');
    setTimeout(() => this.onSubmit(), 1200);
  }
}
