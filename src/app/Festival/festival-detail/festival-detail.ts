import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FestivalService } from '../festival-service';

@Component({
  selector: 'app-festival-detail',
  imports: [RouterLink],
  templateUrl: './festival-detail.html',
  styleUrl: './festival-detail.css',
})
export class FestivalDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(FestivalService);

  private readonly params = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly festivalId = computed(() => {
    const rawId = this.params().get('festivalId');

    if (rawId === null || !/^[0-9]+$/.test(rawId)) {
      return null;
    }

    const id = Number(rawId);

    return Number.isSafeInteger(id) && id > 0 ? id : null;
  });

  readonly festival = computed(() => {
    const id = this.festivalId();

    return id === null
      ? undefined
      : this.service.findById(id);
  });
}