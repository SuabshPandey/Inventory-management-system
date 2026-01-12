import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { SignIn } from './features/auth/sign-in/sign-in';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./features/auth/sign-in/sign-in').then((m) => m.SignIn),
    title: 'Sign In',
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
        data: { title: 'Dashboard', roles: ['Admin', 'Supervisor'] },
        canActivate: [authGuard],
        title: 'Dashboard',
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/roles/role-list/role-list').then((m) => m.RoleList),
            data: { title: 'Roles', roles: ['Admin'] },
            canActivate: [authGuard],
            title: 'Roles',
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/roles/role-form/role-form').then((m) => m.RoleForm),
            data: { title: 'Add Role', roles: ['Admin'] },
            canActivate: [authGuard],
            title: 'Add Role',
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/roles/role-form/role-form').then((m) => m.RoleForm),
            data: { title: 'View Role', roles: ['Admin'] },
            canActivate: [authGuard],
            title: 'View Role',
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/users/users-list/users-list').then((m) => m.UsersList),
            data: { title: 'Users', roles: ['Admin'] },
            canActivate: [authGuard],
            title: 'Users',
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/users/user-form/user-form').then((m) => m.UserForm),
            data: { title: 'Add User', roles: ['Admin'] },
            canActivate: [authGuard],
            title: 'Add User',
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/users/user-form/user-form').then((m) => m.UserForm),
            data: { title: 'View User', roles: ['Admin'] },
            canActivate: [authGuard],
            title: 'View User',
          },
        ],
      },
      {
        path: 'items',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/items/item-list/item-list').then((m) => m.ItemList),
            data: { title: 'Items', roles: ['Admin', 'Supervisor'] },
            canActivate: [authGuard],
            title: 'Items',
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/items/item-form/item-form').then((m) => m.ItemForm),
            data: { title: 'Add Item', roles: ['Admin', 'Supervisor'] },
            canActivate: [authGuard],
            title: 'Add Item',
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/items/item-form/item-form').then((m) => m.ItemForm),
            data: { title: 'View Item', roles: ['Admin', 'Supervisor'] },
            canActivate: [authGuard],
            title: 'View Item',
          },
        ],
      },
      {
        path: 'sales',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/sales/sale-list/sale-list').then((m) => m.SaleList),
            data: { title: 'Sales', roles: ['Admin', 'Salesperson'] },
            canActivate: [authGuard],
            title: 'Sales',
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/sales/sale-form/sale-form').then((m) => m.SaleForm),
            data: { title: 'Add Sale', roles: ['Admin', 'Salesperson'] },
            canActivate: [authGuard],
            title: 'Add Sale',
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/sales/sale-form/sale-form').then((m) => m.SaleForm),
            data: { title: 'View Sale', roles: ['Admin', 'Salesperson'] },
            canActivate: [authGuard],
            title: 'View Sale',
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
