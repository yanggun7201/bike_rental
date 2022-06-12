import axios from 'axios';
import { getToken } from "./auth";
import { API_BASE } from "./constants";

// https://github.com/axios/axios#config-defaults
axios.defaults.baseURL = API_BASE;

let setAuthErrorHandler = false;

interface InitAxiosProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorHandler: (error: any) => any;
}

export const initAxios = ({
  errorHandler
}: InitAxiosProps) => {
  if (setAuthErrorHandler) {
    return;
  }
  setAuthErrorHandler = true;

  // Add a request interceptor
  axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axios.interceptors.response.use((response) => {
    return response;
  }, errorHandler);

}
