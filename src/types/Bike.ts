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
  reservationWithUsers?: Reservation[];
  ratings?: Rating[];
}

export const EMPTY_BIKE: Bike = {
  id: -1,
  model: "",
  color: "",
  location: "",
  ratingAverage: 0,
  active: true,
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

export interface InputBikeError {
  model?: string;
  color?: string;
  location?: string;
}
