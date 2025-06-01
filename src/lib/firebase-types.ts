import type { User } from 'firebase/auth';

export interface AuthUser extends User {
  role?: string;
  email: string | null;
  displayName: string | null;
  uid: string;
}

export type { User }; 