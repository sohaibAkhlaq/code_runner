import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { SubmissionService } from '../../core/services/submission.service';
import { ProblemService } from '../../core/services/problem.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  private submissionService = inject(SubmissionService);
  private problemService    = inject(ProblemService);

  today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  stats = signal([
    { key: 'solved',   label: 'Problems Solved', value: '42',   delta: '↑ +5 this week',  icon: '⚡', accent: 'var(--p-400)'   },
    { key: 'accepted', label: 'Accepted',         value: '38',   delta: '↑ +3 this week',  icon: '✅', accent: 'var(--success)' },
    { key: 'rate',     label: 'Success Rate',     value: '90%',  delta: '↑ Top 12%',       icon: '📈', accent: 'var(--a-400)'   },
    { key: 'streak',   label: 'Day Streak',       value: '7',    delta: '🏆 Best: 14 days', icon: '🔥', accent: 'var(--warning)' },
  ]);

  recentActivity = signal(this.submissionService.getRecentActivity());

  recommended = signal(
    this.problemService.getProblems().slice(0, 5).map(p => ({
      id: p.id, title: p.title, slug: p.slug,
      difficulty: p.difficulty, acceptance: p.acceptance
    }))
  );

  heatmapCells: { intensity: number; count: number }[] = [];

  heatmapLegend = [
    'var(--bg-elevated)',
    'rgba(99,102,241,0.25)',
    'rgba(99,102,241,0.5)',
    'var(--p-500)',
    'var(--a-400)',
  ];

  breakdown = [
    { key: 'easy',   label: 'Easy',   solved: 22, total: 40, pct: 55 },
    { key: 'medium', label: 'Medium', solved: 15, total: 45, pct: 33 },
    { key: 'hard',   label: 'Hard',   solved: 5,  total: 25, pct: 20 },
  ];

  // SVG circle: r=50, circumference ≈ 314.16
  readonly circumference = 2 * Math.PI * 50;
  get progressOffset(): number {
    return this.circumference * (1 - 0.42);
  }

  ngOnInit(): void {
    this.heatmapCells = Array.from({ length: 49 }, () => {
      const intensity = Math.random();
      return { intensity, count: Math.floor(intensity * 12) };
    });
  }

  getHeatmapColor(intensity: number): string {
    if (intensity > 0.80) return 'var(--a-400)';
    if (intensity > 0.55) return 'var(--p-500)';
    if (intensity > 0.35) return 'rgba(99,102,241,0.5)';
    if (intensity > 0.15) return 'rgba(99,102,241,0.2)';
    return 'var(--bg-elevated)';
  }

  getHeatmapGlow(intensity: number): string {
    if (intensity > 0.7) return '0 0 8px rgba(6,182,212,0.4)';
    if (intensity > 0.5) return '0 0 6px rgba(99,102,241,0.3)';
    return 'none';
  }
}
