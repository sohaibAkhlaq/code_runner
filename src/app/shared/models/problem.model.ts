export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  acceptance: number;
  submissions: number;
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  hints: string[];
  tags: string[];
}

export interface ProblemExample {
  id: number;
  input: string;
  output: string;
  explanation?: string;
}
