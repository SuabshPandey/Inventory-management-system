import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Loader } from '../../shared/components/loader/loader';
import { ErrorPage } from '../../shared/components/error-page/error-page';
import { Table } from '../../shared/components/table/table';
import { SaleService } from '../../core/services/sale.service';
import { ItemService } from '../../core/services/item.service';
import { Sale } from '../../core/models/sale.model';
import { Item } from '../../core/models/item.model';
import { CommonModule } from '@angular/common';
import { DashboardCard } from '../../shared/components/dashboard-card/dashboard-card';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Loader, DashboardCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private saleService = inject(SaleService);
  private itemService = inject(ItemService);
  private userService = inject(UserService);

  loading = signal(false);

  sales = signal<Sale[]>([]);
  items = signal<Item[]>([]);
  users = signal<any[]>([]);
  totalUsers = computed(() => this.users().length);

  totalItemsSold = computed(() => this.sales().reduce((acc, sale) => acc + sale.quantity, 0));

  itemsSoldToday = computed(() => {
    const today = new Date().toDateString();
    return this.sales()
      .filter((s) => new Date(s.soldAt).toDateString() === today)
      .reduce((acc, s) => acc + s.quantity, 0);
  });

  mostPopularItem = computed(() => {
    const counts: Record<number, number> = {};
    this.sales().forEach((s) => {
      counts[s.itemId] = (counts[s.itemId] || 0) + s.quantity;
    });

    let maxCount = 0;
    let popularItemId: number | null = null;
    for (const id in counts) {
      if (counts[id] > maxCount) {
        maxCount = counts[id];
        popularItemId = +id;
      }
    }

    const item = this.items().find((i) => i.id === popularItemId);
    return item ? item.name : 'N/A';
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading.set(true);

    this.itemService.getItems().subscribe({
      next: (items) => this.items.set(items),
      complete: () => this.loading.set(false),
    });

    this.saleService.getSales().subscribe({
      next: (sales) => this.sales.set(sales),
      complete: () => this.loading.set(false),
    });
    this.userService.getUsers().subscribe({
      next: (users) => this.users.set(users),
      complete: () => this.loading.set(false),
    });
  }
}
