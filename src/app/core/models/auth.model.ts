export type UserRole = 'Admin' | 'Supervisor' | 'Salesperson';

export interface AuthState {
  role: UserRole;
  isAuthenticated: boolean;
}
