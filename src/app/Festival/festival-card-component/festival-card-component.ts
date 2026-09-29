import { Component, signal, computed, effect, input, output } from '@angular/core';
import { Festival } from '../festival';

@Component({
  imports: [],
  selector: 'app-festival-card-component',
  styleUrl: './festival-card-component.css',
  templateUrl: './festival-card-component.html',
})
export class FestivalCardComponent {
    
  festival = input.required<Festival>(); 
  next = output<number>();
  
  readonly remove = output<number>(); 

  editionLabel = computed(
    () => `${this.festival().name} - Édition ${this.festival().year}`
  );
}