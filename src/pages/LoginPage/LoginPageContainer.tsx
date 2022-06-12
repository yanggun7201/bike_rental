import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../../stores/store";
import { getToken, login } from "../../includes/auth";
import { useSnackbarMessage } from "../../hooks/useSnackbarMessage";
import { LoginPage } from "./LoginPage";

export const LoginPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { showSnackMessage } = useSnackbarMessage();
  const setCurrentUserState = useSetRecoilState(currentUserState);

  const handleLogin = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    login(data.get("email"), data.get("password"))
      .then((result) => {
        console.log( "setCurrentUserState( user )");
        setCurrentUserState({ ...result.user });
        navigate(-1);
      })
      .catch(error => {
        console.log('error', error);
        const message = error?.response?.data?.message;
        if (message.email) {
          showSnackMessage({ type: "error", title: "Sign in error", body: message.email });
        }
        if (typeof (message) === "string") {
          showSnackMessage({ type: "error", title: "Sign in error", body: message });
        }
      });
  }, [navigate, setCurrentUserState]);

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
  }, [navigate, getToken]);

  return <LoginPage onSubmit={handleLogin} />;
};
