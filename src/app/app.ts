import { Component, signal } from '@angular/core';
import { FestivalList } from './Festival/festival-list/festival-list';

@Component({
  imports: [FestivalList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('festival-BLANC-app');
}
