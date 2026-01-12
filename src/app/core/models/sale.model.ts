export type UserRole = 'Admin' | 'Supervisor' | 'Salesperson';

export interface Sale {
  id: number;
  itemId: number;
  itemName: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  soldAt: string;
  soldBy: UserRole;
}
