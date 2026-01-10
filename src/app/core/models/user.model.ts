export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Supervisor' | 'Salesperson';
}
