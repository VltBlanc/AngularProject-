import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { FestivalFormModel } from '../festival';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-festival-form',
  imports: [FormField, JsonPipe],
  templateUrl: './festival-form.html',
})
export class FestivalForm {
  readonly model = signal<FestivalFormModel>({
    name: '',
    location: '',
    year: new Date().getFullYear(),  
  });

  readonly festivalForm = form(this.model, path => {
    required(path.name,     { message: 'Le nom est obligatoire.' });
    required(path.location, { message: 'Le lieu est obligatoire.' });
    required(path.year,     { message: "L'année est obligatoire." });
  });
}