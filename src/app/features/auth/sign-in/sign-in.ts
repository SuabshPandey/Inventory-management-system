import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../core/models/sale.model';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  roles: UserRole[] = ['Admin', 'Supervisor', 'Salesperson'];

  form = this.fb.group({
    role: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const role = this.form.value.role as UserRole;
    this.authService.login(role);

    // redirect after login
    this.router.navigate(['/dashboard']);
  }
}
