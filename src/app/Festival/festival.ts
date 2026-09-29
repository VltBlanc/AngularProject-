export interface Festival {
  readonly id: number;
  name: string;
  location: string;
  year: number;
  status: 'planned' | 'open' | 'closed';
  featured: boolean;
}

export type FestivalDraft = Pick<Festival, 'name' | 'location' | 'year'>;
export type FestivalFormModel = Omit<FestivalDraft, 'year'> & { year: number | null };

export function emptyFestivalForm(): FestivalFormModel {
  return { name: '', location: '', year: new Date().getFullYear() };
}

export function festivalToForm(f: Festival): FestivalFormModel {
  return { name: f.name, location: f.location, year: f.year };
}

export function toFestivalDraft(m: FestivalFormModel): FestivalDraft | null {
  if (m.year === null) return null;
  return { name: m.name.trim(), location: m.location.trim(), year: m.year };
}