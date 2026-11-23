import { afterNextRender, Component, ElementRef, inject, Injector, output, signal, viewChild, viewChildren, } from '@angular/core';import { FestivalCardComponent } from '../festival-card-component/festival-card-component';
import { FestivalService} from '../festival-service';
@Component({
  imports: [FestivalCardComponent],
  selector: 'app-festival-list',
  styleUrl: './festival-list.css',
  templateUrl: './festival-list.html',
})
export class FestivalList {
  readonly service = inject(FestivalService);
  readonly statusMessage = signal('');
   
  readonly create = output<void>();

  private readonly injector = inject(Injector);
  
  private readonly cards =
  viewChildren<unknown, ElementRef<HTMLElement>>('festivalCard', {
    read: ElementRef,
  });
  
  private readonly createButton =
    viewChild<ElementRef<HTMLButtonElement>>('createButton');





  
    removeFestival(id: number): void {
      const festivals = this.service.festivals();
      const removedIndex = festivals.findIndex(f => f.id === id);
      const removed = festivals[removedIndex];
    
      if (!removed || !this.service.remove(id)) {
        return;
      }
    
      this.statusMessage.set(`${removed.name} a été supprimé.`);
    
      afterNextRender(() => {
        const remainingCards = this.cards();
    
        if (remainingCards.length === 0) {
          this.createButton()?.nativeElement.focus();
          return;
        }
    
       
        const targetIndex = Math.min(
          removedIndex,
          remainingCards.length - 1,
        );
    
        const targetCard = remainingCards[targetIndex].nativeElement;
    
        targetCard
          .querySelector<HTMLElement>('button, a[href]')
          ?.focus();
      }, { injector: this.injector });
    }

  nextEdition(id: number): void {
    this.service.nextEdition(id);
  }

  onEdit(id: number): void {
    this.service.requestEdit(id);
  }
}