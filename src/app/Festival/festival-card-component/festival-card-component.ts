import { Component, signal, computed, effect} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-festival-card-component',
  styleUrl: './festival-card-component.css',
  templateUrl: './festival-card-component.html',
})
export class FestivalCardComponent {
    festival1 = signal<Festival>({
      id: 1,
      name: "PolyFestival",
      location:"Montpellier",
      year: 2026,
    });

  editionLabel = computed(() => `\({this.festival1().name} - Édition\){this.festival1().year}`);

  NextEdition(): void {
    this.festival1.update( f => ({...f, year: this.festival1().year + 1}) )
  }
  constructor(){
  effect(() => { console.log("L'édition courante est :", this.festival1().year)});
    
}
}

export interface Festival {
  readonly id: number;
  name: string;
  location: string;
  year: number;
 } 
