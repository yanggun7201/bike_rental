import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initAxios } from "../includes/ajaxConfig";
import { setToken, setUserToStorage } from "../includes/auth";
import { useSnackbarMessage } from "./useSnackbarMessage";

const useAxiosAuth = () => {

  const navigate = useNavigate();
  const { showSnackMessage } = useSnackbarMessage();

  useEffect(() => {
    initAxios({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorHandler: (error: any) => {
        if (error?.response?.status === 401) {
          setUserToStorage("");
          setToken("");
          showSnackMessage({ type: "error", title: "Auth Error", body: error.message });
          navigate("/signin");
        }
        throw error?.response ?? error;
      }
    });
  }, [showSnackMessage]);
}

export default useAxiosAuth;
