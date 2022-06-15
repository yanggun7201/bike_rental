import { atom } from "recoil";
import { User } from "../types/User";

type DefaultUser = User | null;

const DEFAULT_USER: DefaultUser = null;

export const currentUserState = atom({
  key: 'currentUserState',
  default: DEFAULT_USER as DefaultUser,
});
