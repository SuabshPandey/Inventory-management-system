import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
        data: { title: 'Dashboard' },
        title: 'Dashboard',
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/users/users-list/users-list').then((m) => m.UsersList),
            data: { title: 'Users' },
            title: 'Users',
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/users/user-form/user-form').then((m) => m.UserForm),
            data: { title: 'Add User' },
            title: 'Add User',
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/users/user-form/user-form').then((m) => m.UserForm),
            data: { title: 'View User' },
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
            data: { title: 'Items' },
            title: 'Items',
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/items/item-form/item-form').then((m) => m.ItemForm),
            data: { title: 'Add Item' },
            title: 'Add Item',
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/items/item-form/item-form').then((m) => m.ItemForm),
            data: { title: 'View Item' },
            title: 'View Item',
          },
        ],
      },
      {
        path: 'sales',
        loadComponent: () => import('./features/sales/sales').then((m) => m.Sales),
        data: { title: 'Sales' },
        title: 'Sales',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
