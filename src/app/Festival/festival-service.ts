import { Service, signal, computed, effect } from '@angular/core';
import { Festival } from './festival'; 

@Service()
export class FestivalService {
  private readonly _festivals = signal<Festival[]>([
    { id: 1, name: 'PolyFestival', location: 'Montpellier', year: 2026, status: 'open', featured: true },
    { id: 2, name: 'Hellfest', location: 'Clisson', year: 2026, status: 'planned', featured: false },
    { id: 3, name: 'Solidays', location: 'Paris', year: 2026, status: 'closed', featured: false },
  ]);

  readonly festivals = this._festivals.asReadonly();
  readonly festivalCount = computed(() => this._festivals().length);

  constructor() {
    effect(() => {
      console.log("Les festivals sont :", this._festivals());
    });
  }

  findById(id: number): Festival | undefined {
    return this._festivals().find(f => f.id === id);
  }

  remove(id: number): boolean {
    if (!this.findById(id)) return false;
    this._festivals.update(list => list.filter(f => f.id !== id));
    return true;
  }

  nextEdition(id: number): boolean {
    if (!this.findById(id)) return false;
    this._festivals.update(list =>
      list.map(f => (f.id === id ? { ...f, year: f.year + 1 } : f))
    );
    return true;
  }
}