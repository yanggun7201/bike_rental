import axios from "axios";
import jwt_decode from "jwt-decode";
import { toInteger } from "lodash";
import { getNowSeconds } from "./numbers";
import { SignInInputUser, SignUpInputUser, User } from "../types/User";

const USER_KEY = "bike_rental_user";
const TOKEN_KEY = "bike_rental_token";
export type Token = string | null;
export type TokenDecoded = {
  exp?: number,
}

export const getToken = (): Token => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return null;
  }

  const decoded = jwt_decode<TokenDecoded>(token);
  const expires_in = toInteger(decoded?.exp) || 0;

  if (expires_in < getNowSeconds()) {
    return null;
  }

  return token;
}

export const setToken = (token: Token) => {
  localStorage.setItem(TOKEN_KEY, token ?? "");
  if (!token) {
    setUserToStorage("");
  }
}

export const getUserFromStorage = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export const setUserToStorage = (user: User | "") => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.setItem(USER_KEY, user);
  }
}

export const login = (user: SignInInputUser) => {
  return axios.post(
    "/bikerental/login",
    JSON.stringify(user),
  )
    .then(result => {
      if (result.status === 200 && result.data) {
        setUserToStorage(result.data.data.user);
        setToken(result.data.data.token);
      }
      return result.data.data;
    });
}

export const register = (user: SignUpInputUser) => {
  const data = {
    ...user,
    password_confirmation: user.passwordConfirmation,
  }
  return axios.post(
    "/bikerental/register",
    JSON.stringify(data),
  )
    .then(result => {
      if (result.status === 200 && result.data) {
        return result.data.data;
      }
      return result.data.data;
    });
}

export const logout = () => {
  return axios.get(
    "/bikerental/logout",
  ).then(() => setToken(null));
}
