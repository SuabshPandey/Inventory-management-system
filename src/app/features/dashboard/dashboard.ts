import { Component, signal, WritableSignal } from '@angular/core';
import { Loader } from '../../shared/components/loader/loader';
import { ErrorPage } from '../../shared/components/error-page/error-page';
import { Table } from '../../shared/components/table/table';

@Component({
  selector: 'app-dashboard',
  imports: [Loader, ErrorPage, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // loading = signal(false);
  errorMessage = signal('Something went wrong while loading the dashboard.');
  status = signal('400');
  loading: WritableSignal<boolean> = signal(false);
  tableData: WritableSignal<any[]> = signal([]);
  columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'role', header: 'Role' },
  ];

  actions = [
    {
      name: 'Delete',
      callback: (row: any) => {
        console.log('Delete action for row:', row);
        this.deleteRow(row.id);
      },
    },
  ];

  constructor() {
    this.loadTableData();
  }

  loadTableData() {
    this.loading.set(true);

    // Testing with mock data
    setTimeout(() => {
      const mockUsers = [
        { id: 1, name: 'Subash Pandey', email: 'subash@gmail.com', role: 'Admin' },
        { id: 2, name: 'Sanjag', email: 'sanjag@gmail.com', role: 'Supervisor' },
        { id: 3, name: 'Tapu', email: 'tapu@gmail.com', role: 'Salesperson' },
      ];
      this.tableData.set(mockUsers);
      this.loading.set(false);
    }, 1000);
  }

  deleteRow(id: number) {
    const filtered = this.tableData().filter((u) => u.id !== id);
    this.tableData.set(filtered);
  }
}
