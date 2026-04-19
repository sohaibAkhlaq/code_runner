import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  readonly user = this.currentUser.asReadonly();

  constructor(private router: Router) {
    // Check for stored auth
    const stored = localStorage.getItem('cr_user');
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
      this.isAuthenticated.set(true);
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));

    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      username: 'johndoe',
      email,
      location: 'San Francisco, CA',
      website: 'johndoe.dev',
      joinedDate: 'March 2024',
      streak: 7,
      bestStreak: 14,
      role: 'user'
    };

    this.currentUser.set(mockUser);
    this.isAuthenticated.set(true);
    localStorage.setItem('cr_user', JSON.stringify(mockUser));
    return true;
  }

  async register(name: string, email: string, password: string): Promise<boolean> {
    await new Promise(r => setTimeout(r, 1200));

    const mockUser: User = {
      id: '2',
      name,
      username: name.toLowerCase().replace(/\s+/g, ''),
      email,
      joinedDate: 'March 2026',
      streak: 0,
      bestStreak: 0,
      role: 'user'
    };

    this.currentUser.set(mockUser);
    this.isAuthenticated.set(true);
    localStorage.setItem('cr_user', JSON.stringify(mockUser));
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('cr_user');
    this.router.navigate(['/']);
  }
}
