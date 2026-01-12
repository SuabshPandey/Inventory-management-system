import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Table } from '../../../shared/components/table/table';
import { Loader } from '../../../shared/components/loader/loader';
import { SaleService } from '../../../core/services/sale.service';
import { ItemService } from '../../../core/services/item.service';
import { Router } from '@angular/router';
import { Sale } from '../../../core/models/sale.model';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-sale-list',
  imports: [CommonModule, Table, Loader],
  templateUrl: './sale-list.html',
  styleUrl: './sale-list.scss',
})
export class SaleList {
  private saleService = inject(SaleService);
  private itemService = inject(ItemService);
  private router = inject(Router);

  sales = signal<Sale[]>([]);
  items = signal<Item[]>([]);
  loading = signal(false);

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'itemName', header: 'Item' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'soldBy', header: 'Sold By' },
    { field: 'soldAt', header: 'Date' },
  ];


  actions = [{ name: 'Delete', callback: (row: any) => this.removeSale(row.id) }];

  ngOnInit() {
    this.loadItems();
    this.loadSales();
  }

  loadItems() {
    this.itemService.getItems().subscribe({
      next: (items) => this.items.set(items),
    });
  }

  loadSales() {
    this.loading.set(true);
    this.saleService.getSales().subscribe({
      next: (sales) => this.sales.set(sales),
      complete: () => this.loading.set(false),
    });
  }

  getItemName(itemId: number) {
    const item = this.items().find((i) => i.id === itemId);
    return item ? item.name : 'Unknown';
  }

  addSale() {
    this.router.navigate(['/sales/add']);
  }

  removeSale(id: number) {
    this.loading.set(true);
    this.saleService.deleteSale(id).subscribe({
      next: () => this.loadSales(),
      complete: () => this.loading.set(false),
    });
  }
}
