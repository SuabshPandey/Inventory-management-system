import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '../../../core/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../core/models/item.model';
import { CommonModule } from '@angular/common';
import { Loader } from '../../../shared/components/loader/loader';

@Component({
  selector: 'app-item-form',
  imports: [CommonModule, ReactiveFormsModule, Loader],
  templateUrl: './item-form.html',
  styleUrl: './item-form.scss',
})
export class ItemForm implements OnInit {
  private fb = inject(FormBuilder);
  private itemService = inject(ItemService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading = signal(false);
  isEditMode = signal(false);
  itemId: number | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    sku: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.itemId = Number(id);
      this.loadItem(this.itemId);
    }
  }

  loadItem(id: number) {
    this.loading.set(true);
    this.itemService.getItems().subscribe({
      next: (items) => {
        const item = items.find((i) => i.id === id);
        if (item) {
          this.form.patchValue(item);
        }
      },
      complete: () => this.loading.set(false),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);

    const item: Item = {
      id: this.itemId ?? Date.now(),
      name: this.form.value.name!,
      sku: this.form.value.sku!,
      price: this.form.value.price!,
      stock: this.form.value.stock!,
    };

    const request$ = this.isEditMode()
      ? this.itemService.updateItem(item)
      : this.itemService.addItem(item);

    request$.subscribe({
      next: () => this.router.navigate(['/items']),
      complete: () => this.loading.set(false),
    });
  }

  onCancel() {
    this.form.reset();
  }
  goBack() {
    this.router.navigate(['/items']);
  }
}
