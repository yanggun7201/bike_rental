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

export interface SignInInputUser {
  email?: string;
  password?: string;
}
export type SignInInputUserError = SignInInputUser;

export interface SignUpInputUser extends SignInInputUser {
  name?: string;
  role?: string;
  passwordConfirmation?: string;
}

export type InputUserError = SignUpInputUser;
export type SignUpInputUserError = SignUpInputUser;

export const EMPTY_USER: User = {
  id: -1,
  name: "",
  email: "",
  role: UserRole.USER,
}
