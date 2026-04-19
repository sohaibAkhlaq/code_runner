import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProblemService } from '../../core/services/problem.service';
import { Problem } from '../../shared/models/problem.model';

const STARTER_CODE: Record<string, string> = {
  typescript:  `function twoSum(nums: number[], target: number): number[] {\n  // Write your TypeScript solution here\n  return [];\n}`,
  javascript:  `function twoSum(nums, target) {\n  // Write your JavaScript solution here\n  return [];\n}`,
  python:      `def twoSum(nums: List[int], target: int) -> List[int]:\n    # Write your Python solution here\n    return []`,
  java:        `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your Java solution here\n        return new int[]{};\n    }\n}`,
  cpp:         `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your C++ solution here\n        return {};\n    }\n};`,
};

@Component({
  selector: 'app-problem-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  templateUrl: './problem-detail.component.html',
  styleUrl: './problem-detail.component.scss',
})
export class ProblemDetailComponent implements OnInit {
  private route          = inject(ActivatedRoute);
  private router         = inject(Router);
  private problemService = inject(ProblemService);

  problem          = signal<Problem | null>(null);
  activeTab        = signal<'description' | 'hints' | 'submissions'>('description');
  activeOutputTab  = signal<'testcases' | 'result'>('testcases');
  activeTestCase   = signal(0);

  language        = signal('typescript');
  code            = signal(STARTER_CODE['typescript']);

  isRunning       = signal(false);
  isSubmitting    = signal(false);
  hasResult       = signal(false);
  resultStatus    = signal<'accepted' | 'wrong' | 'error'>('accepted');
  copied          = signal(false);
  activeLine      = signal(0);

  codeLines = computed(() => this.code().split('\n'));

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      const p = this.problemService.getProblemBySlug(slug);
      p ? this.problem.set(p) : this.router.navigate(['/problems']);
    }
  }

  onLanguageChange(lang: string): void {
    this.language.set(lang);
    this.code.set(STARTER_CODE[lang] ?? STARTER_CODE['typescript']);
    this.hasResult.set(false);
  }

  resetCode(): void {
    this.code.set(STARTER_CODE[this.language()] ?? STARTER_CODE['typescript']);
    this.hasResult.set(false);
  }

  async copyCode(): Promise<void> {
    await navigator.clipboard.writeText(this.code()).catch(() => {});
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }

  handleTab(event: Event): void {
    event.preventDefault();
    const ta = event.target as HTMLTextAreaElement;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const val   = ta.value;
    this.code.set(val.substring(0, start) + '  ' + val.substring(end));
    // Restore caret
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + 2;
    });
  }

  updateActiveLine(event: Event): void {
    const ta = event.target as HTMLTextAreaElement;
    const text = ta.value.substring(0, ta.selectionStart);
    this.activeLine.set(text.split('\n').length - 1);
  }

  async runCode(): Promise<void> {
    this.isRunning.set(true);
    this.hasResult.set(false);
    this.activeOutputTab.set('result');
    await new Promise(r => setTimeout(r, 900));
    this.isRunning.set(false);
    this.hasResult.set(true);
    this.resultStatus.set(Math.random() > 0.4 ? 'accepted' : 'wrong');
  }

  async submitCode(): Promise<void> {
    this.isSubmitting.set(true);
    this.hasResult.set(false);
    this.activeOutputTab.set('result');
    await new Promise(r => setTimeout(r, 1800));
    this.isSubmitting.set(false);
    this.hasResult.set(true);
    this.resultStatus.set(Math.random() > 0.25 ? 'accepted' : 'error');
  }
}
