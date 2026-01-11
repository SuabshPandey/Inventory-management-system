import { Component, inject, signal } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { CommonModule, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Table } from '../../../shared/components/table/table';
import { Loader } from '../../../shared/components/loader/loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, Table, Loader],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  private userService = inject(UserService);
  private router = inject(Router);
  users = signal<User[]>([]);
  loading = signal(false);
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
        this.deleteUser(row);
      },
    },
    {
      name: 'Edit',
      callback: (row: any) => {
        this.editUser(row);
      },
    },
  ];
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.userService.getUsers().subscribe({
      next: (users) => this.users.set(users),
      complete: () => this.loading.set(false),
    });
  }
  addUser() {
    this.router.navigate(['/users/add']);
  }

  deleteUser = (user: User) => {
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) return;
    this.loading.set(true);
    this.userService.deleteUser(user.id).subscribe({
      next: () => this.loadUsers(),
      complete: () => this.loading.set(false),
    });
  };

  editUser = (user: User) => {
    this.router.navigate(['/users/view', user.id]);
  };
}
