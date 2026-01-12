import { Component, inject, OnInit, signal } from '@angular/core';
import { RoleService } from '../../../core/services/role.service';
import { Router } from '@angular/router';
import { Role } from '../../../core/models/role.model';
import { CommonModule } from '@angular/common';
import { Table } from '../../../shared/components/table/table';
import { Loader } from '../../../shared/components/loader/loader';

@Component({
  selector: 'app-role-list',
  imports: [CommonModule, Table, Loader],
  templateUrl: './role-list.html',
  styleUrl: './role-list.scss',
})
export class RoleList implements OnInit {
  private roleService = inject(RoleService);
  private router = inject(Router);

  roles = signal<Role[]>([]);
  loading = signal(false);

  columns = [{ field: 'name', header: 'Role Name' }];

  actions = [
    {
      name: 'Edit',
      callback: (role: Role) => this.editRole(role),
    },
    {
      name: 'Delete',
      callback: (role: Role) => this.deleteRole(role.id),
    },
  ];

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.loading.set(true);
    this.roleService.getRoles().subscribe({
      next: (roles) => this.roles.set(roles),
      complete: () => this.loading.set(false),
    });
  }

  addRole() {
    this.router.navigate(['/roles/add']);
  }

  editRole(role: Role) {
    this.router.navigate(['/roles/view', role.id]);
  }

  deleteRole(id: number) {
    if (!confirm('Are you sure you want to delete this role?')) return;

    this.loading.set(true);
    this.roleService.deleteRole(id).subscribe({
      next: () => this.loadRoles(),
      complete: () => this.loading.set(false),
    });
  }
}
