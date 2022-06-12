export interface Bike {
  id: number;
  model: string;
  color: string;
  location: string;
  ratingAverage: number;
  active: boolean
}

export type BikeFilters = {
  models: string [],
  colors: string [],
  locations: string [],
  ratings: number[],
}

export const DefaultBikeFilters = {
  models: [],
  colors: [],
  locations: [],
  ratings: [],
}
