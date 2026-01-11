import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemService } from '../../../core/services/item.service';
import { CommonModule } from '@angular/common';
import { Loader } from '../../../shared/components/loader/loader';
import { Router } from '@angular/router';
import { Item } from '../../../core/models/item.model';
import { Table } from '../../../shared/components/table/table';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule, Table, Loader],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})
export class ItemList implements OnInit {
  private itemService = inject(ItemService);
  private router = inject(Router);

  items = signal<Item[]>([]);
  loading = signal<boolean>(false);

  columns = [
    { field: 'name', header: 'Name' },
    { field: 'sku', header: 'SKU' },
    { field: 'price', header: 'Price' },
    { field: 'stock', header: 'Stock' },
  ];

  actions = [
    {
      name: 'Edit',
      callback: (item: Item) => this.editItem(item),
    },
    {
      name: 'Delete',
      callback: (item: Item) => this.deleteItem(item.id),
    },
  ];

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.loading.set(true);
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.items.set(items);
      },
      complete: () => this.loading.set(false),
    });
  }

  addItem() {
    this.router.navigate(['/items/add']);
  }

  editItem(item: Item) {
    this.router.navigate(['/items/view', item.id]);
  }

  deleteItem(id: number) {
    this.loading.set(true);
    this.itemService.deleteItem(id).subscribe({
      next: () => this.loadItems(),
      complete: () => this.loading.set(false),
    });
  }
}
