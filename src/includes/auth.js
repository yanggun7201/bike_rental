import axios from "axios";
import jwt_decode from "jwt-decode";
import { toInteger } from "lodash";
import { getNowSeconds } from "./numbers";

const USER_KEY = "bike_rental_user";
const TOKEN_KEY = "bike_rental_token";

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return null;
  }

  const decoded = jwt_decode(token);
  const expires_in = toInteger(decoded.exp) || 0;

  if (expires_in<getNowSeconds()) {
    logout();
    return null;
  }

  return token;
}

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token ?? "");
  if (!token) {
    setUserToStorage(null);
  }
}

export const getUserFromStorage = () => {
  const user = localStorage.getItem(USER_KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export const setUserToStorage = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.setItem(USER_KEY, user);
  }
}

export const login = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  return axios.post(
    "/bikerental/login",
    JSON.stringify(data),
  )
    .then(result => {
      if (result.status === 200 && result.data) {
        setUserToStorage(result.data.data.user);
        setToken(result.data.data.token);
      }
      return result.data.data;
    });
}

export const logout = () => {
  return axios.get(
    "/bikerental/logout",
  );
}
