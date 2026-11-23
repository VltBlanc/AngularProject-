import { Component } from '@angular/core';
import { FestivalForm } from '../festival-form/festival-form';
import { FestivalList } from '../festival-list/festival-list';

@Component({
  selector: 'app-festival-page',
  imports: [FestivalForm, FestivalList],
  templateUrl: './festival-page.html',
  styleUrl: './festival-page.css',
})
export class FestivalPage {}