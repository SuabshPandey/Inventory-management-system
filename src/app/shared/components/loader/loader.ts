import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {
  @Input() loading = signal<boolean>(false);
  @Input() message = 'Loading...';
}
