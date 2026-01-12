import { Injectable } from '@angular/core';
import { UserRole } from '../models/sale.model';
import { AuthState } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_state';

  constructor() {}

  login(role: UserRole): void {
    const authState: AuthState = {
      role,
      isAuthenticated: true,
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authState));
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  getAuthState(): AuthState | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  
  isLoggedIn(): boolean {
    return !!this.getAuthState()?.isAuthenticated;
  }

  getCurrentRole(): UserRole | null {
    return this.getAuthState()?.role ?? null;
  }
}
