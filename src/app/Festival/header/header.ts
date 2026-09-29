import { Component, inject } from '@angular/core';
import { FestivalService } from '../festival-service';
@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  readonly service = inject(FestivalService);

}
