import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  // Columns definition
  @Input() columns: { field: string; header: string }[] = [];

  // Data stored as a writable signal
  @Input({ required: true }) data!: any[];

  // Loading state as writable signal
  @Input() loading: WritableSignal<boolean> = signal(false);

  // Optional actions
  @Input() actions: { name: string; callback: (row: any) => void }[] = [];
}
