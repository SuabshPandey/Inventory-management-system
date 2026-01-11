import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-error-page',
  imports: [],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss',
})
export class ErrorPage {
  @Input() status = signal<string>('Error');
  @Input() message = signal<string>('Something went wrong');
}
