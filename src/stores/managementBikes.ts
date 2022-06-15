import { atom } from "recoil";
import { Bike } from "../types/Bike";

export const managementBikesState = atom({
  key: 'managementBikesState',
  default: [] as Bike[],
});
