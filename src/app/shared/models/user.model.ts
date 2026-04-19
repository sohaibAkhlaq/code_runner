export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  location?: string;
  website?: string;
  joinedDate: string;
  streak: number;
  bestStreak: number;
  role: 'user' | 'admin';
}
