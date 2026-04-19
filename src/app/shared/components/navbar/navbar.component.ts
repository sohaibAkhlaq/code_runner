import { Component, signal, HostListener, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authService = inject(AuthService);
  isMenuOpen = signal(false);
  isScrolled  = signal(false);

  navItems = [
    { label: 'Problems',    route: '/problems',    icon: '⚡' },
    { label: 'Dashboard',   route: '/dashboard',   icon: '📊' },
    { label: 'Submissions', route: '/submissions',  icon: '📋' },
    { label: 'Leaderboard', route: '/profile',      icon: '🏆' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  logout(): void {
    this.authService.logout();
    this.isMenuOpen.set(false);
  }
}
