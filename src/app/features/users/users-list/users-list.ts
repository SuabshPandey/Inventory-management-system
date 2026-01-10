import { Component, inject, signal } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  userService = inject(UserService);

  users = signal<User[]>([]); // writable signal
  loading = signal(false);

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

  deleteUser(id: number) {
    this.loading.set(true);
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      complete: () => this.loading.set(false),
    });
  }
}
