import { Component, effect, inject, signal, untracked } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Festival, FestivalFormModel, festivalToForm, emptyFestivalForm, toFestivalDraft } from '../festival';
import { FestivalService } from '../festival-service';

@Component({
  selector: 'app-festival-form',
  imports: [FormField, JsonPipe],
  templateUrl: './festival-form.html',
})
export class FestivalForm {
  readonly service = inject(FestivalService);
  readonly selectedId = signal<number | null>(null);
  readonly statusMessage = signal('');
  readonly model = signal<FestivalFormModel>(emptyFestivalForm());

  readonly editorForm = form(this.model, path => {
    required(path.name,     { message: 'Nom du festival : valeur obligatoire.' });
    required(path.location, { message: 'Ville : valeur obligatoire.' });
    required(path.year,     { message: 'Année : valeur obligatoire.' });
  });

  startEdit(item: Festival): void {
    if (this.editorForm().submitting()) return;
    this.selectedId.set(item.id);
    this.editorForm().reset(festivalToForm(item));
    this.statusMessage.set('Modification ouverte.');
    this.editorForm.name().focusBoundControl();
  }

  startCreate(): void {
    if (this.editorForm().submitting()) return;
    this.selectedId.set(null);
    this.editorForm().reset(emptyFestivalForm());
    this.statusMessage.set('');
    this.editorForm.name().focusBoundControl();
  }

  cancel(): void {
    this.selectedId.set(null);
    this.editorForm().reset(emptyFestivalForm());
    this.statusMessage.set('Saisie annulée.');
    this.editorForm.name().focusBoundControl();
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.editorForm().submitting()) return;
    this.statusMessage.set('');
    const id = this.selectedId();

    const success = await submit(this.editorForm, {
      action: async field => {
        const draft = toFestivalDraft(field().value());
        if (!draft) return { kind: 'invalid', message: 'Saisie incomplète.' };
        if (id === null) {
          this.service.add(draft);
          return undefined;
        }
        return this.service.update({ id, ...draft })
          ? undefined
          : { kind: 'missing', message: "Ce festival n'existe plus." };
      },
      onInvalid: field => {
        this.statusMessage.set('Corrigez les champs indiqués.');
        field().errorSummary()[0]?.fieldTree().focusBoundControl();
      },
    });

    if (success) {
      this.startCreate();
      this.statusMessage.set(id === null ? 'Création enregistrée.' : 'Modification enregistrée.');
    }
  }


  constructor() {
    effect(() => {
      const id = this.service.editRequest();
      if (id === null) return;

      untracked(() => {
        const festival = this.service.findById(id);
        if (festival) {
          this.startEdit(festival);
        } else {
          this.statusMessage.set("Ce festival n'existe plus.");
        }
        this.service.clearEditRequest(); 
      });
    });
  }
}