import { Injectable } from '@angular/core';
import { Sale, UserRole } from '../models/sale.model';
import { Item } from '../models/item.model';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private SALES_KEY = 'sales';
  private ITEMS_KEY = 'items';

  constructor() {}

  getSales(): Observable<Sale[]> {
    return of(this.getSalesFromStorage()).pipe(delay(this.simulateLatency()));
  }

  sellItem(itemId: number, quantity: number, soldBy: UserRole): Observable<Sale> {
    const items = this.getItemsFromStorage();
    const itemIndex = items.findIndex((i) => i.id === itemId);

    if (itemIndex === -1) {
      return throwError(() => new Error('Item not found'));
    }

    const item = items[itemIndex];

    if (item.stock < quantity) {
      return throwError(() => new Error('Insufficient stock'));
    }

    items[itemIndex] = {
      ...item,
      stock: item.stock - quantity,
    };

    this.saveItemsToStorage(items);

    const sales = this.getSalesFromStorage();
    const sale: Sale = {
      id: sales.length ? Math.max(...sales.map(s => s.id)) + 1 : 1,
      itemId: item.id,
      itemName: item.name,
      quantity,
      pricePerUnit: item.price,
      totalPrice: item.price * quantity,
      soldAt: new Date().toISOString(),
      soldBy,
    };

    sales.push(sale);
    this.saveSalesToStorage(sales);

    return of(sale).pipe(delay(this.simulateLatency()));
  }

  //   Helper methods for localStorage interaction
  private getSalesFromStorage(): Sale[] {
    const data = localStorage.getItem(this.SALES_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveSalesToStorage(sales: Sale[]): void {
    localStorage.setItem(this.SALES_KEY, JSON.stringify(sales));
  }

  private getItemsFromStorage(): Item[] {
    const data = localStorage.getItem(this.ITEMS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveItemsToStorage(items: Item[]): void {
    localStorage.setItem(this.ITEMS_KEY, JSON.stringify(items));
  }

  private simulateLatency(): number {
    return Math.floor(Math.random() * 2000) + 500; // 500–2500ms
  }
}
