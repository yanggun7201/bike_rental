import { Reservation } from "./Reservation";
import { Rating } from "./Rating";
import { UserRole } from "./UserRole";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  reservations?: Reservation[];
  historyReservations?: Reservation[];
  reservationWithBikes?: Reservation[];
  ratings?: Rating[];
}

export interface InputUser extends User {
  password?: string,
  passwordConfirmation?: string;
}

export const EMPTY_USER: User = {
  id: -1,
  name: "",
  email: "",
  role: UserRole.USER,
}
