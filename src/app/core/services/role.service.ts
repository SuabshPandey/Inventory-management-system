import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private STORAGE_KEY = 'roles';

  constructor() {}

  getRoles(): Observable<Role[]> {
    return of(this.getRolesFromStorage()).pipe(delay(this.simulateLatency()));
  }

  getRoleById(id: number): Observable<Role | undefined> {
    return this.getRoles().pipe(map((roles) => roles.find((r) => r.id === id)));
  }

  addRole(role: Role): Observable<Role> {
    const roles = this.getRolesFromStorage();
    roles.push(role);
    this.saveToStorage(roles);
    return of(role).pipe(delay(this.simulateLatency()));
  }

  updateRole(updatedRole: Role): Observable<Role> {
    const roles = this.getRolesFromStorage();
    const index = roles.findIndex((r) => r.id === updatedRole.id);
    if (index !== -1) {
      roles[index] = updatedRole;
      this.saveToStorage(roles);
    }
    return of(updatedRole).pipe(delay(this.simulateLatency()));
  }

  deleteRole(id: number): Observable<boolean> {
    const roles = this.getRolesFromStorage().filter((r) => r.id !== id);
    this.saveToStorage(roles);
    return of(true).pipe(delay(this.simulateLatency()));
  }
  // Helper methods for roles to interact with localStorage
  private getRolesFromStorage(): Role[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(roles: Role[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(roles));
  }

  private simulateLatency(): number {
    return Math.floor(Math.random() * 2000) + 500;
  }
}
