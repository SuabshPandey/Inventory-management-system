import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/sign-in']);
    return false;
  }

  const currentRole = authService.getCurrentRole();

  const allowedRoles = route.data['roles'] as
    | ('Admin' | 'Supervisor' | 'Salesperson')[]
    | undefined;

  if (allowedRoles && !allowedRoles.includes(currentRole!)) {
    // Dynamically redirect based on role
    switch (currentRole) {
      case 'Admin':
      case 'Supervisor':
        router.navigate(['/dashboard']);
        break;
      case 'Salesperson':
        router.navigate(['/sales']);
        break;
      default:
        router.navigate(['/sign-in']);
    }
    return false;
  }

  return true;
};
