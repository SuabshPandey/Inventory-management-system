import { Component, signal } from '@angular/core';
import { Loader } from '../../shared/components/loader/loader';
import { ErrorPage } from '../../shared/components/error-page/error-page';

@Component({
  selector: 'app-dashboard',
  imports: [Loader, ErrorPage],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  loading = signal(false);
  errorMessage = signal('Something went wrong while loading the dashboard.');
  status = signal('400');
}
