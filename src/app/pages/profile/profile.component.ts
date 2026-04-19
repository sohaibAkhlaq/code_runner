import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);

  skills = [
    { name: 'Algorithms',          level: 85, color: 'var(--p-400)'   },
    { name: 'Data Structures',     level: 90, color: 'var(--success)'  },
    { name: 'Dynamic Programming', level: 65, color: 'var(--warning)'  },
    { name: 'Graph Theory',        level: 45, color: 'var(--a-400)'    },
    { name: 'System Design',       level: 55, color: 'var(--violet)'   },
  ];

  achievements = [
    { title: 'First Blood',   desc: 'Solve your first problem',      icon: '🩸', earned: true  },
    { title: '7 Day Streak',  desc: 'Code for 7 consecutive days',   icon: '🔥', earned: true  },
    { title: 'Speed Demon',   desc: 'Beat 95% of runtimes',          icon: '⚡', earned: true  },
    { title: 'Algo Master',   desc: 'Solve 100 Medium problems',     icon: '🧠', earned: false },
    { title: 'Century Club',  desc: 'Solve 100 problems total',      icon: '💯', earned: false },
    { title: 'Hat Trick',     desc: 'Solve 3 Hard problems in a day',icon: '🎩', earned: false },
  ];

  breakdown = [
    { key: 'easy',   label: 'Easy',   solved: 22, total: 40, pct: 55 },
    { key: 'medium', label: 'Medium', solved: 15, total: 45, pct: 33 },
    { key: 'hard',   label: 'Hard',   solved: 5,  total: 25, pct: 20 },
  ];

  heatmapCells: { intensity: number }[] = [];

  ngOnInit(): void {
    this.heatmapCells = Array.from({ length: 90 }, () => ({
      intensity: Math.random() > 0.35 ? Math.random() : 0
    }));
  }

  getHeatmapColor(intensity: number): string {
    if (intensity === 0)   return 'var(--bg-elevated)';
    if (intensity > 0.75)  return 'var(--a-400)';
    if (intensity > 0.50)  return 'var(--p-500)';
    if (intensity > 0.25)  return 'rgba(99,102,241,0.45)';
    return 'rgba(99,102,241,0.18)';
  }
}
