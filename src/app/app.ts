import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FestivalCardComponent } from './Festival/festival-card-component/festival-card-component';

@Component({
  imports: [RouterOutlet,FestivalCardComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('festival-BLANC-app');
}
