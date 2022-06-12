import { atom } from "recoil";

export interface User {
  name: string;
  email: string;
  role: string;
}

const DEFAULT_USER: User | null = null;

export const currentUserState = atom({
  key: 'currentUserState',
  default: DEFAULT_USER as User | null,
});
