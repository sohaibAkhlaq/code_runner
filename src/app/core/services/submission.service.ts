import { Injectable } from '@angular/core';
import { Submission } from '../../shared/models/submission.model';

@Injectable({ providedIn: 'root' })
export class SubmissionService {
  private mockSubmissions: Submission[] = [
    { id: 1, problemId: '1', problemName: 'Two Sum', status: 'accepted', time: '45ms', memory: '38.2 MB', language: 'java', date: '2 min ago' },
    { id: 2, problemId: '2', problemName: 'Reverse Linked List', status: 'accepted', time: '32ms', memory: '35.1 MB', language: 'python', date: '1 hour ago' },
    { id: 3, problemId: '3', problemName: 'Valid Parentheses', status: 'wrong', time: '—', memory: '—', language: 'javascript', date: '3 hours ago' },
    { id: 4, problemId: '4', problemName: 'Merge Intervals', status: 'tle', time: '—', memory: '—', language: 'cpp', date: '5 hours ago' },
    { id: 5, problemId: '5', problemName: 'LRU Cache', status: 'accepted', time: '78ms', memory: '42.3 MB', language: 'java', date: 'Yesterday' },
    { id: 6, problemId: '7', problemName: 'Binary Tree Traversal', status: 'runtime', time: '—', memory: '—', language: 'python', date: 'Yesterday' },
    { id: 7, problemId: '10', problemName: 'Climbing Stairs', status: 'accepted', time: '28ms', memory: '31.5 MB', language: 'go', date: '2 days ago' },
    { id: 8, problemId: '4', problemName: 'Maximum Subarray', status: 'compile', time: '—', memory: '—', language: 'cpp', date: '2 days ago' },
    { id: 9, problemId: '1', problemName: 'Best Time to Buy Stock', status: 'accepted', time: '52ms', memory: '39.8 MB', language: 'java', date: '3 days ago' },
    { id: 10, problemId: '3', problemName: 'Container With Most Water', status: 'running', time: '—', memory: '—', language: 'javascript', date: 'Just now' },
  ];

  getSubmissions(): Submission[] {
    return this.mockSubmissions;
  }

  getRecentActivity(): Submission[] {
    return this.mockSubmissions.slice(0, 5);
  }
}
