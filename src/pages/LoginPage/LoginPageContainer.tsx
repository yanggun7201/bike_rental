import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../../stores/store";
import { getToken, login } from "../../includes/auth";
import { useSnackbarMessage } from "../../hooks/useSnackbarMessage";
import { LoginPage } from "./LoginPage";
import { PageTitle } from "../../components/PageTitle";

export const LoginPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { showSnackMessage } = useSnackbarMessage();
  const setCurrentUserState = useSetRecoilState(currentUserState);

  const handleLogin = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    login(data.get("email"), data.get("password"))
      .then((result) => {
        setCurrentUserState({ ...result.user });
        navigate(-1);
      })
      .catch(error => {
        const message = error?.response?.data?.message;
        if (message.email) {
          showSnackMessage({ type: "error", title: "Login error", body: message.email });
        }
        if (typeof (message) === "string") {
          showSnackMessage({ type: "error", title: "Login error", body: message });
        }
      });
  }, [navigate, setCurrentUserState]);

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
  }, [navigate, getToken]);

  return (
    <>
      <PageTitle>Login</PageTitle>
      <LoginPage onSubmit={handleLogin} />;
    </>
  );
}
