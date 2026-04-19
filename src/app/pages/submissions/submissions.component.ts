import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SubmissionService } from '../../core/services/submission.service';

@Component({
  selector: 'app-submissions',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './submissions.component.html',
  styleUrl: './submissions.component.scss',
})
export class SubmissionsComponent {
  private submissionService = inject(SubmissionService);
  submissions = signal(this.submissionService.getSubmissions());

  accepted = computed(() => this.submissions().filter(s => s.status === 'accepted').length);
  rate     = computed(() => this.submissions().length
    ? Math.round((this.accepted() / this.submissions().length) * 100) : 0);

  summary = [
    { icon: '📨', label: 'Total',    value: '10',  color: 'var(--p-300)' },
    { icon: '✅', label: 'Accepted', value: '6',   color: 'var(--success)' },
    { icon: '📈', label: 'Rate',     value: '60%', color: 'var(--a-400)'   },
    { icon: '⚡', label: 'Fastest',  value: '28ms',color: 'var(--warning)' },
  ];
}
