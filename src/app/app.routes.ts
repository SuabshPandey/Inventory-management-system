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
        path: 'items',
        loadComponent: () => import('./features/items/items').then((m) => m.Items),
        data: { title: 'Items' },
        title: 'Items',
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
