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