import { atom } from "recoil";
import { User } from "../types/User";

const DEFAULT_USER: User | null = null;

export const currentUserState = atom({
  key: 'currentUserState',
  default: DEFAULT_USER as User | null,
});
