import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loader } from '../../../shared/components/loader/loader';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule, Loader],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  roles = ['Admin', 'Supervisor', 'Salesperson'];
  loading = signal(false);
  isEdit = signal(false);
  userId?: number;
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['Admin', Validators.required],
  });
  constructor() {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.userId = +idParam;
      this.isEdit.set(true);
      this.loadUser(this.userId);
    }
  }

  loadUser(id: number) {
    this.loading.set(true);
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        if (user) {
          this.form.patchValue(user); 
        }
      },
      complete: () => this.loading.set(false),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const userData: User = {
      id: this.isEdit() ? this.userId! : Date.now(),
      name: this.form.value.name!,
      email: this.form.value.email!,
      role: this.form.value.role! as 'Admin' | 'Supervisor' | 'Salesperson',
    };

    this.loading.set(true);

    const observer = this.isEdit()
      ? this.userService.updateUser(userData)
      : this.userService.addUser(userData);

    observer.subscribe({
      next: () => {
        this.router.navigate(['/users']); 
      },
      error: (err) => {
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  onCancel() {
    this.form.reset({ name: '', email: '', role: 'Admin' });
  }
  goBack() {
    this.router.navigate(['/users']);
  }
}
