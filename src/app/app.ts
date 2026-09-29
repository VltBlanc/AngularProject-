import { Component, signal } from '@angular/core';
import { FestivalList } from './Festival/festival-list/festival-list';
import { Header } from './Festival/header/header';
import { FestivalForm } from './Festival/festival-form/festival-form';

@Component({
  imports: [FestivalList, Header, FestivalForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('festival-BLANC-app');
}
