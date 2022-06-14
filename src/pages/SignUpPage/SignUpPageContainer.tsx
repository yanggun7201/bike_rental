import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isEmpty, trim } from "lodash";
import { currentUserState } from "../../stores/store";
import { register } from "../../includes/auth";
import { SignUpInputUser, SignUpInputUserError } from "../../types/User";
import { useSnackbarMessage } from "../../hooks/useSnackbarMessage";
import { getErrorMessage } from "../../includes/errorMessage";
import { SignUpPage } from "./SignUpPage";
import { PageTitle } from "../../components/PageTitle";
import { SimpleUL } from "../../components/SimpleUL";

const validateUser = (user: SignUpInputUser): SignUpInputUserError => {
  const errors: SignUpInputUserError = {};

  if (isEmpty(trim(user.email))) {
    errors.email = "Email is required";
  }

  if (isEmpty(trim(user.name))) {
    errors.name = "Name is required";
  }

  if (isEmpty(trim(user.role))) {
    errors.role = "Role is required";
  }

  if (isEmpty(trim(user.password))) {
    errors.password = "Password is required";
  } else if (isEmpty(trim(user.passwordConfirmation))) {
    errors.passwordConfirmation = "Password confirmation is required";
  } else if (user.password !== user.passwordConfirmation) {
    errors.passwordConfirmation = "These passwords don’t match.";
  }

  return errors;
};

const mapToUser = (event: React.FormEvent<HTMLFormElement>): SignUpInputUser => {
  const data = new FormData(event.currentTarget);
  const user: SignUpInputUser = {
    email: data.get("email")?.toString() ?? "",
    name: data.get("name")?.toString() ?? "",
    role: data.get("role")?.toString() ?? "",
    password: data.get("password")?.toString() ?? "",
    passwordConfirmation: data.get("passwordConfirmation")?.toString() ?? "",
  }
  return user;
}

export const SignUpPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { showSnackMessage } = useSnackbarMessage();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = mapToUser(event);
    const errors = validateUser(user);
    console.log('user', user);
    if (!isEmpty(errors)) {
      const errorMessage = Object.values(errors).map(error => (<li key={error}>{error}</li>));
      showSnackMessage({ type: "error", title: "Validation Error", body: <SimpleUL>{errorMessage}</SimpleUL> });
      return;
    }

    setLoading(true);

    register(user)
      .then((result) => {
        console.log('result.user', result.user);
        if (result?.user) {
          showSnackMessage({ title: "Register success!" });
        }
        navigate("/signin", { replace: true });
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
      <PageTitle>Sign up</PageTitle>
      <SignUpPage onSubmit={handleLogin} loading={loading} />
    </>
  );
}
