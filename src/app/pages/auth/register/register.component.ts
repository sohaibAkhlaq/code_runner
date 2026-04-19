import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router      = inject(Router);

  nameValue     = '';
  emailValue    = '';
  passwordValue = '';

  isLoading     = signal(false);
  showPassword  = signal(false);
  nameError     = signal('');
  emailError    = signal('');
  passwordError = signal('');
  globalError   = signal('');

  panelFeatures = [
    { icon: '🆓', text: 'Free forever — no credit card needed' },
    { icon: '📚', text: '100+ curated algorithm problems' },
    { icon: '🤖', text: 'AI hints on every problem' },
    { icon: '🏆', text: 'Compete on the global leaderboard' },
  ];

  passwordStrength = computed(() => {
    const pw = this.passwordValue;
    if (!pw) return 'none';
    let score = 0;
    if (pw.length >= 8)   score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return 'weak';
    if (score === 2) return 'fair';
    if (score === 3) return 'good';
    return 'strong';
  });

  passwordStrengthLabel = computed(() => {
    const s = this.passwordStrength();
    const map: Record<string, string> = { weak: 'Weak', fair: 'Fair', good: 'Good', strong: 'Strong 💪' };
    return map[s] || '';
  });

  async onSubmit(): Promise<void> {
    this.nameError.set('');
    this.emailError.set('');
    this.passwordError.set('');
    this.globalError.set('');

    if (!this.nameValue.trim()) { this.nameError.set('Name is required'); return; }
    if (!this.emailValue || !this.emailValue.includes('@')) { this.emailError.set('Valid email required'); return; }
    if (this.passwordValue.length < 8) { this.passwordError.set('Password must be at least 8 characters'); return; }

    this.isLoading.set(true);
    try {
      const ok = await this.authService.register(this.nameValue, this.emailValue, this.passwordValue);
      if (ok) { this.router.navigate(['/dashboard']); }
      else     { this.globalError.set('Registration failed. Please try again.'); }
    } catch {
      this.globalError.set('An error occurred. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
