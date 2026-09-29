import { Component, signal, effect, computed } from '@angular/core';
import { Festival } from '../festival';
import { FestivalCardComponent } from '../festival-card-component/festival-card-component';

@Component({
  imports: [FestivalCardComponent],
  selector: 'app-festival-list',
  styleUrl: './festival-list.css',
  templateUrl: './festival-list.html',
})
export class FestivalList {
  festivals = signal<Festival[]>([
    { id: 1, name: 'PolyFestival', location: 'Montpellier', year: 2026, status: 'open', featured: true },
    { id: 2, name: 'Hellfest', location: 'Clisson', year: 2026, status: 'planned', featured: false },
    { id: 3, name: 'Solidays', location: 'Paris', year: 2026, status: 'closed', featured: false },
  ]);

  nextEdition(id: number): void {
    this.festivals.update(list =>
      list.map(f => {
        if (f.id === id) {
          return { ...f, year: f.year + 1 };
        }
        return f;
      })
    );
  }

  constructor(){
    effect(() => { console.log("L'édition courante est :", this.festivals())
    });  
  }

  readonly statusMessage = signal('');
  removeFestival(id: number) {
    const removed = this.festivals().find(f => f.id === id);
  
    this.festivals.update(list => list.filter(f => f.id !== id));
  
    if (removed) {
      this.statusMessage.set(`${removed.name} a été supprimé.`);
    }
  }
}
