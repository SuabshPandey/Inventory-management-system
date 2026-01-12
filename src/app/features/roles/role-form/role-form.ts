import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loader } from '../../../shared/components/loader/loader';
import { RoleService } from '../../../core/services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../core/models/role.model';

@Component({
  selector: 'app-role-form',
  imports: [CommonModule, ReactiveFormsModule, Loader],
  templateUrl: './role-form.html',
  styleUrl: './role-form.scss',
})
export class RoleForm {
  private fb = inject(FormBuilder);
  private roleService = inject(RoleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = signal(false);
  error = signal<string | null>(null);

  roleId: number | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
  });

  ngOnInit() {
    // Check if we're editing a role
    this.route.params.subscribe((params) => {
      this.roleId = params['id'] ? +params['id'] : null;
      if (this.roleId !== null) {
        this.loadRole(this.roleId);
      }
    });
  }
  loadRole(id: number) {
    this.loading.set(true);
    this.roleService.getRoleById(id).subscribe({
      next: (role) => {
        if (role) this.form.patchValue({ name: role.name });
        else this.error.set('Role not found');
      },
      error: (err) => this.error.set(err.message || 'Failed to load role'),
      complete: () => this.loading.set(false),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const role: Role = {
      id: this.roleId || new Date().getTime(), // simple unique id
      name: this.form.value.name!,
    };

    this.loading.set(true);
    this.error.set(null);

    const request = this.roleId
      ? this.roleService.updateRole(role)
      : this.roleService.addRole(role);

    request.subscribe({
      next: () => this.router.navigate(['/roles']),
      error: (err) => this.error.set(err.message || 'Failed to save role'),
      complete: () => this.loading.set(false),
    });
  }

  onCancel() {
    this.router.navigate(['/roles']);
  }
}
