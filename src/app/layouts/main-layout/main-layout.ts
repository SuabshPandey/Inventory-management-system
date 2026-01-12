import { Component, inject, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
} from '@angular/router';
import { filter, map } from 'rxjs';

interface MenuItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  pageTitle = signal('Dashboard');
  menuItems = signal<MenuItem[]>([
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Roles', path: '/roles' },
    { label: 'Users', path: '/users' },
    { label: 'Items', path: '/items' },
    { label: 'Sales', path: '/sales' },
  ]);

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getChildTitle(this.route))
      )
      .subscribe((title) => this.pageTitle.set(title));
  }

  private getChildTitle(route: ActivatedRoute): string {
    let child = route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    return child?.snapshot.data['title'] ?? 'Inventory Management System';
  }
}
