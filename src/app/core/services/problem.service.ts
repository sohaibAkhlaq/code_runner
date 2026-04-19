import { Injectable, signal } from '@angular/core';
import { Problem } from '../../shared/models/problem.model';

@Injectable({ providedIn: 'root' })
export class ProblemService {
  private mockProblems: Problem[] = [
    {
      id: '1', slug: 'two-sum', title: 'Two Sum', difficulty: 'easy',
      acceptance: 67.3, submissions: 2345,
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      examples: [
        { id: 1, input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
        { id: 2, input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
        { id: 3, input: 'nums = [3,3], target = 6', output: '[0,1]' }
      ],
      constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹', 'Only one valid answer exists'],
      hints: [
        'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
        'If we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x.',
        'Can we change our array somehow so that this search becomes faster?'
      ],
      tags: ['Array', 'Hash Table']
    },
    {
      id: '2', slug: 'reverse-linked-list', title: 'Reverse Linked List', difficulty: 'easy',
      acceptance: 82.1, submissions: 1890,
      description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      examples: [{ id: 1, input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
      constraints: ['0 ≤ Number of nodes ≤ 5000', '-5000 ≤ Node.val ≤ 5000'],
      hints: ['Try using iteration with three pointers.'], tags: ['Linked List']
    },
    {
      id: '3', slug: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'easy',
      acceptance: 75.4, submissions: 3100,
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
      examples: [{ id: 1, input: 's = "()"', output: 'true' }],
      constraints: ['1 ≤ s.length ≤ 10⁴'], hints: ['Use a stack.'], tags: ['Stack', 'String']
    },
    {
      id: '4', slug: 'merge-intervals', title: 'Merge Intervals', difficulty: 'medium',
      acceptance: 52.3, submissions: 1450,
      description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
      examples: [{ id: 1, input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
      constraints: ['1 ≤ intervals.length ≤ 10⁴'], hints: ['Sort first, then merge.'], tags: ['Array', 'Sorting']
    },
    {
      id: '5', slug: 'lru-cache', title: 'LRU Cache', difficulty: 'medium',
      acceptance: 45.6, submissions: 980,
      description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
      examples: [{ id: 1, input: '["LRUCache", "put", "put", "get"]', output: '[null, null, null, 1]' }],
      constraints: ['1 ≤ capacity ≤ 3000'], hints: ['Use a HashMap + Doubly Linked List.'], tags: ['Hash Table', 'Linked List', 'Design']
    },
    {
      id: '6', slug: 'longest-substring', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium',
      acceptance: 68.2, submissions: 2100,
      description: 'Given a string s, find the length of the longest substring without repeating characters.',
      examples: [{ id: 1, input: 's = "abcabcbb"', output: '3' }],
      constraints: ['0 ≤ s.length ≤ 5 × 10⁴'], hints: ['Use sliding window.'], tags: ['String', 'Sliding Window']
    },
    {
      id: '7', slug: 'binary-tree-traversal', title: 'Binary Tree Level Order Traversal', difficulty: 'medium',
      acceptance: 72.0, submissions: 1550,
      description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.',
      examples: [{ id: 1, input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' }],
      constraints: ['0 ≤ Number of nodes ≤ 2000'], hints: ['Use BFS with a queue.'], tags: ['Tree', 'BFS']
    },
    {
      id: '8', slug: 'edit-distance', title: 'Edit Distance', difficulty: 'hard',
      acceptance: 45.2, submissions: 678,
      description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.',
      examples: [{ id: 1, input: 'word1 = "horse", word2 = "ros"', output: '3' }],
      constraints: ['0 ≤ word1.length, word2.length ≤ 500'], hints: ['Use dynamic programming.'], tags: ['DP', 'String']
    },
    {
      id: '9', slug: 'word-break', title: 'Word Break', difficulty: 'medium',
      acceptance: 52.1, submissions: 890,
      description: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence.',
      examples: [{ id: 1, input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true' }],
      constraints: ['1 ≤ s.length ≤ 300'], hints: ['Think about DP.'], tags: ['DP', 'String']
    },
    {
      id: '10', slug: 'climbing-stairs', title: 'Climbing Stairs', difficulty: 'easy',
      acceptance: 88.4, submissions: 5200,
      description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps.',
      examples: [{ id: 1, input: 'n = 3', output: '3' }],
      constraints: ['1 ≤ n ≤ 45'], hints: ['Fibonacci pattern.'], tags: ['Math', 'DP']
    }
  ];

  getProblems(): Problem[] {
    return this.mockProblems;
  }

  getProblemBySlug(slug: string): Problem | undefined {
    return this.mockProblems.find(p => p.slug === slug);
  }
}
