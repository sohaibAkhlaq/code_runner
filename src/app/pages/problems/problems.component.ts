import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProblemService } from '../../core/services/problem.service';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.scss',
})
export class ProblemsComponent {
  private problemService = inject(ProblemService);

  problems        = signal(this.problemService.getProblems());
  searchQuery     = signal('');
  difficultyFilter = signal('all');
  tagFilter       = signal('all');

  difficulties = [
    { value: 'all',    label: 'All'    },
    { value: 'easy',   label: 'Easy'   },
    { value: 'medium', label: 'Medium' },
    { value: 'hard',   label: 'Hard'   },
  ];

  allTags = [...new Set(this.problemService.getProblems().flatMap(p => p.tags))].sort();

  filteredProblems = computed(() => {
    const q    = this.searchQuery().toLowerCase();
    const diff = this.difficultyFilter();
    const tag  = this.tagFilter();
    return this.problems().filter(p => {
      const matchQ    = p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
      const matchDiff = diff === 'all' || p.difficulty === diff;
      const matchTag  = tag  === 'all' || p.tags.includes(tag);
      return matchQ && matchDiff && matchTag;
    });
  });

  getCount(diff: string): number {
    if (diff === 'all') return this.problems().length;
    return this.problems().filter(p => p.difficulty === diff).length;
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.difficultyFilter.set('all');
    this.tagFilter.set('all');
  }
}
