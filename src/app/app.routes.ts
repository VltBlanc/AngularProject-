import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'festivals',
    pathMatch: 'full',
  },
  {
    path: 'festivals',
    title: 'Catalogue des festivals',
    loadComponent: () =>
      import('./Festival/festival-page/festival-page')
        .then(m => m.FestivalPage),
  },
  {
    path: 'festivals/:festivalId',
    title: 'Fiche du festival',
    loadComponent: () =>
      import('./Festival/festival-detail/festival-detail')
        .then(m => m.FestivalDetail),
  },
  {
    path: '**',
    title: 'Page introuvable',
    loadComponent: () =>
      import('./Not-found/not-found')
        .then(m => m.NotFound),
  },
];