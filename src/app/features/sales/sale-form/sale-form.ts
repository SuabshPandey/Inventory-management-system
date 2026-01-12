import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loader } from '../../../shared/components/loader/loader';
import { ItemService } from '../../../core/services/item.service';
import { SaleService } from '../../../core/services/sale.service';
import { Router } from '@angular/router';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-sale-form',
  imports: [CommonModule, ReactiveFormsModule, Loader],
  templateUrl: './sale-form.html',
  styleUrl: './sale-form.scss',
})
export class SaleForm implements OnInit {
  private fb = inject(FormBuilder);
  private itemService = inject(ItemService);
  private saleService = inject(SaleService);
  private router = inject(Router);

  items = signal<Item[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  currentRole: 'Admin' | 'Salesperson' = 'Salesperson';

  form = this.fb.group({
    itemId: [null, Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
  });

  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    this.loading.set(true);
    this.itemService.getItems().subscribe({
      next: (items) => this.items.set(items),
      complete: () => this.loading.set(false),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { itemId, quantity } = this.form.value;

    if (itemId == null || quantity == null) return;

    this.loading.set(true);
    this.error.set(null);

    // Convert itemId to number before passing
    this.saleService.sellItem(+itemId, quantity, this.currentRole).subscribe({
      next: () => {
        this.router.navigate(['/sales']);
      },
      error: (err) => {
        this.error.set(err.message || 'Sale failed');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  onCancel() {
    this.form.reset();
  }

  goBack() {
    this.router.navigate(['/sales']);
  }
}
