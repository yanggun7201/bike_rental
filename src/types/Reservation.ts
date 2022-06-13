import { Bike } from "./Bike";

export interface Reservation {
  id: number;
  bikeId: number;
  userId: number;
  reserveDate: string;
  fromTime: string;
  toTime: string;
  active: boolean;
  bike?: Bike;
}
