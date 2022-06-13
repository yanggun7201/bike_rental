import { Reservation } from "./Reservation";
import { Rating } from "./Rating";

export interface Bike {
  id: number;
  model: string;
  color: string;
  location: string;
  ratingAverage: number;
  active: boolean;
  reservations?: Reservation[];
  ratings?: Rating[];
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
