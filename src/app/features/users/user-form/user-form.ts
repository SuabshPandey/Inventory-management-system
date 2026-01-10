import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  userService = inject(UserService);

  // Form fields as signals
  name = signal('');
  email = signal('');
  role = signal<'Admin' | 'Supervisor' | 'Salesperson'>('Admin'); // default role

  loading = signal(false);
  successMessage = signal('');

  addUser() {
    this.loading.set(true);
    const newUser: User = {
      id: Date.now(), // simple ID
      name: this.name(),
      email: this.email(),
      role: this.role(),
    };

    this.userService.addUser(newUser).subscribe({
      next: () => {
        this.successMessage.set('User added successfully!');
        // Reset form
        this.name.set('');
        this.email.set('');
        this.role.set('Admin');
      },
      complete: () => this.loading.set(false),
    });
  }
}
