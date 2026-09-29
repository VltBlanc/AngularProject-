import { Component, inject, signal } from '@angular/core';
import { FestivalCardComponent } from '../festival-card-component/festival-card-component';
import { FestivalService
  
 } from '../festival-service';
@Component({
  imports: [FestivalCardComponent],
  selector: 'app-festival-list',
  styleUrl: './festival-list.css',
  templateUrl: './festival-list.html',
})
export class FestivalList {
  readonly service = inject(FestivalService);
  readonly statusMessage = signal('');

  removeFestival(id: number): void {
    const removed = this.service.findById(id);  
    if (this.service.remove(id) && removed) {
      this.statusMessage.set(`${removed.name} a été supprimé.`);
    }
  }

  nextEdition(id: number): void {
    this.service.nextEdition(id);
  }

  onEdit(id: number): void {
    this.service.requestEdit(id);
  }
}