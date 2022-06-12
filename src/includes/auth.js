import axios from "axios";
import jwt_decode from "jwt-decode";
import { isNumber, toInteger } from "lodash";
import { getNowSeconds } from "./numbers";
import moment from "moment";


export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const decoded = jwt_decode(token);
  console.log('decoded', decoded);

  const expires_in = toInteger(decoded.exp) || 0;
  console.log('____expires_in', expires_in);
  console.log('getNowSeconds()', getNowSeconds());

  if (expires_in<getNowSeconds()) {
    logout();
    return null;
  }

  return token;
}

const setExpiresIn = (expires_in) => {
  if (isNumber(expires_in)) {
    const calculatedExpiredIn = getNowSeconds() + toInteger(expires_in);
    localStorage.setItem("expires_in", calculatedExpiredIn);
  }
}

export const setToken = (token) => {
  localStorage.setItem("token", token ?? "");
  if (!token) {
    setUserToStorage(null);
  }
}

export const getUserFromStorage = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export const setUserToStorage = (user) => {
  if (user) {
    setExpiresIn(user.expires_in);
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.setItem("user", user);
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
    {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "current-date": moment().format("YYYY-MM-DD"),
      }
    },
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
    {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "current-date": moment().format("YYYY-MM-DD"),
      }
    },
  );
}
