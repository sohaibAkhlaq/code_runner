export interface Submission {
  id: number;
  problemId: string;
  problemName: string;
  status: 'accepted' | 'wrong' | 'tle' | 'runtime' | 'compile' | 'running';
  time: string;
  memory: string;
  language: string;
  date: string;
  code?: string;
}
