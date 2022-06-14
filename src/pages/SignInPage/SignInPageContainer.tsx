import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isEmpty, trim } from "lodash";
import { currentUserState } from "../../stores/store";
import { SignInInputUser, SignInInputUserError } from "../../types/User";
import { login } from "../../includes/auth";
import { getErrorMessage } from "../../includes/errorMessage";
import { useSnackbarMessage } from "../../hooks/useSnackbarMessage";
import { SignInPage } from "./SignInPage";
import { PageTitle } from "../../components/PageTitle";
import { SimpleUL } from "../../components/SimpleUL";

const validateUser = (user: SignInInputUser): SignInInputUserError => {
  const errors: SignInInputUserError = {};

  if (isEmpty(trim(user.email))) {
    errors.email = "Email is required";
  }
  if (isEmpty(trim(user.password))) {
    errors.password = "Password is required";
  }

  return errors;
};

export const SignInPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { showSnackMessage } = useSnackbarMessage();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user: SignInInputUser = {
      email: data.get("email")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
    }

    const errors = validateUser(user);
    if (!isEmpty(errors)) {
      const errorMessage = Object.values(errors).map(error => (<li key={error}>{error}</li>));
      showSnackMessage({ type: "error", title: "Validation Error", body: <SimpleUL>{errorMessage}</SimpleUL> });
      return;
    }

    setLoading(true);

    login(user)
      .then((result) => {
        setCurrentUser({ ...result.user });
        navigate(-1);
      })
      .catch(error => {
        setLoading(false);
        showSnackMessage({ type: "error", title: "Login error", body: getErrorMessage(error) });
      });
  }, [navigate, setCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  return (
    <>
      <PageTitle>Login</PageTitle>
      <SignInPage onSubmit={handleLogin} loading={loading} />
    </>
  );
}
