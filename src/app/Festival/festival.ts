export interface Festival {
  readonly id: number;
  name: string;
  location: string;
  year: number;
  status: FestivalStatus; 
  featured: boolean; 
 } 
 
 export type FestivalStatus = 'planned' | 'open' | 'closed';