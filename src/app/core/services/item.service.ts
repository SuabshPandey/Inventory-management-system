import { Injectable } from '@angular/core';
import { delay, map, Observable, of, OperatorFunction } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly storageKey = 'items';
  constructor() {}

  getItems(): Observable<Item[]> {
    return of(this.getItemFromStorage());
  }

  getItemById(id: number): Observable<Item | undefined> {
    return this.getItems().pipe(map((items) => items.find((item) => item.id === id)));
  }

  addItem(item: Item): Observable<Item> {
    const items = this.getItemFromStorage();
    items.push(item);
    this.saveToStorage(items);
    return of(item).pipe(this.withLatency());
  }

  updateItem(updatedItem: Item): Observable<Item> {
    const items = this.getItemFromStorage();
    const index = items.findIndex((i) => i.id === updatedItem.id);

    if (index !== -1) {
      items[index] = updatedItem;
      this.saveToStorage(items);
    }

    return of(updatedItem).pipe(this.withLatency());
  }

  deleteItem(id: number): Observable<boolean> {
    const items = this.getItemFromStorage().filter((item) => item.id !== id);
    this.saveToStorage(items);
    return of(true).pipe(this.withLatency());
  }

  restockItem(id: number, quantity: number): Observable<Item> {
    const items = this.getItemFromStorage();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new Error('Item not found');
    }

    if (quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }

    const updatedItem: Item = {
      ...items[index],
      stock: items[index].stock + quantity,
    };

    items[index] = updatedItem;
    this.saveToStorage(items);

    return of(updatedItem).pipe(this.withLatency());
  }

  // Helper method for localStorage interaction

  private getItemFromStorage(): Item[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(items: Item[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private withLatency<T>(): OperatorFunction<T, T> {
    const randomDelay = Math.floor(Math.random() * 2000) + 500;
    return delay(randomDelay);
  }
}
