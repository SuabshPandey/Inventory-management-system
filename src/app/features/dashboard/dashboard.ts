import { Component, signal } from '@angular/core';
import { Loader } from '../../shared/components/loader/loader';

@Component({
  selector: 'app-dashboard',
  imports: [Loader],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  loading = signal(false);
}
