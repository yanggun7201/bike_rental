import React, { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { isEmpty, trim } from "lodash";
import { validate as validateEmail } from "email-validator";
import { Box, Divider, MenuItem, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { EMPTY_USER, InputUser, User } from "../../../../../types/User";
import { UserRole } from "../../../../../types/UserRole";
import { Actions } from "../../../../../types/Actions";
import { useSnackbarMessage } from "../../../../../hooks/useSnackbarMessage";
import { LabelledTextField } from "../../../../../components/LabelledTextField";
import { SelectBox } from "../../../../../components/SelectBox";
import { SimpleUL } from "../../../../../components/SimpleUL";

type InputUserError = {
  email?: string,
  name?: string,
  role?: string,
  password?: string;
  passwordConfirmation?: string;
}

const validateUser = (user: InputUser, action: Actions): InputUserError => {
  const errors: InputUserError = {};

  if (isEmpty(trim(user.email))) {
    errors.email = "Email is required";
  } else if (!validateEmail(trim(user.email))) {
    errors.email = 'Email is invalid';
  }

  if (isEmpty(trim(user.name))) {
    errors.name = "Name is required";
  }
  if (isEmpty(trim(user.role))) {
    errors.role = "Role is required";
  }

  if (
    Actions.CREATE === action
    ||
    (!isEmpty(trim(user.password)) || !isEmpty(trim(user.passwordConfirmation)))
  ) {
    if (isEmpty(trim(user.password))) {
      errors.password = "Password is required";
    } else if (isEmpty(trim(user.passwordConfirmation))) {
      errors.passwordConfirmation = "Password confirmation is required";
    } else if (user.password !== user.passwordConfirmation) {
      errors.passwordConfirmation = "These passwords don’t match.";
    }
  }

  return errors;
};

interface Props {
  user: User | null,
  onAction: (user: User, action: Actions) => void;
  onCancelForm: () => void;
  updateUserLoading: boolean;
  deleteUserLoading: boolean;
  createUserLoading: boolean;
}

const hasFutureReservations = (targetUser: User): boolean => {
  const now = moment();
  return !!targetUser.reservations?.some(item => {
    const reserveDateMoment = moment(item.reserveDate).hours(Number(item.fromTime.split(":")[0]));
    return reserveDateMoment.isAfter(now);
  });
}

export const UserForm: React.FC<Props> = ({
  user,
  onCancelForm,
  onAction,
  updateUserLoading = false,
  deleteUserLoading = false,
  createUserLoading = false,
}) => {

  const [targetUser, setTargetUser] = useState<InputUser>(EMPTY_USER);
  const { showSnackMessage } = useSnackbarMessage();

  const handleUserChanged = useCallback((event) => {
    setTargetUser(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    });
  }, [targetUser]);

  const handleSaveUser = useCallback(() => {
    const action = targetUser.id > 0 ? Actions.UPDATE : Actions.CREATE;
    const errors = validateUser(targetUser, action);

    if (!isEmpty(errors)) {
      const errorMessage = Object.values(errors).map(error => (<li key={error}>{error}</li>));
      showSnackMessage({ type: "error", title: "Validation Error", body: <SimpleUL>{errorMessage}</SimpleUL> });
      return;
    }

    onAction(targetUser, action);
  }, [targetUser, showSnackMessage, onAction]);

  const handleDeleteUser = useCallback((event) => {
    event.preventDefault();

    if (hasFutureReservations(targetUser)) {
      showSnackMessage({ type: "error", title: "Delete Error", body: "There are some future reservations!" });
      return;
    }

    onAction(targetUser, Actions.DELETE);
  }, [targetUser]);

  const isUpdateUser = useMemo(() => {
    return targetUser.id > 0;
  }, [targetUser]);

  const isActionProcessing = useMemo(() => {
    return updateUserLoading || deleteUserLoading || createUserLoading;
  }, [updateUserLoading, deleteUserLoading, createUserLoading]);

  useEffect(() => {
    if (user) {
      setTargetUser({ ...user });
    }
  }, [user]);

  return (
    <>
      <Stack
        alignItems={"center"}
        direction={"row"}
        spacing={2}
        sx={{ mt: 4, mb: 0 }}
      >
        <Typography variant="h6" sx={{ minWidth: 70 }}>
          {isUpdateUser
            ? (`Update User (#${targetUser.id})`)
            : ("Create User")
          }
        </Typography>
        <Divider orientation="vertical" flexItem />
        <LoadingButton
          size="small"
          variant="contained"
          onClick={handleSaveUser}
          disabled={isActionProcessing}
          loading={updateUserLoading || createUserLoading}
          loadingPosition="start"
          startIcon={<CheckIcon />}
        >
          {isUpdateUser ? "Save" : "Create"}
        </LoadingButton>
        {isUpdateUser && (
          <LoadingButton
            size="small"
            color="error"
            variant="contained"
            onClick={handleDeleteUser}
            disabled={isActionProcessing}
            loading={deleteUserLoading}
            loadingPosition="start"
            startIcon={<DeleteForeverIcon />}
          >
            Delete
          </LoadingButton>
        )}
        <LoadingButton
          size="small"
          variant="outlined"
          onClick={onCancelForm}
          disabled={isActionProcessing}
          loadingPosition="start"
          startIcon={<DoDisturbOnIcon />}
        >
          Cancel
        </LoadingButton>
      </Stack>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <LabelledTextField
          autoFocus
          id="email"
          label="User Email"
          name="email"
          value={targetUser.email}
          onChange={handleUserChanged}
        />
        <LabelledTextField
          id="name"
          label="User Name"
          name="name"
          value={targetUser.name}
          onChange={handleUserChanged}
        />

        <SelectBox
          label="User Role"
          name="role"
          value={targetUser.role}
          onChange={handleUserChanged}
          size="medium"
          fullWidth
        >
          {Object.keys(UserRole).map(item => (<MenuItem value={item} key={item}>{item}</MenuItem>))}
        </SelectBox>

        {!isUpdateUser && (
          <LabelledTextField
            type="password"
            id="password"
            label="Password"
            name="password"
            value={targetUser.password}
            onChange={handleUserChanged}
          />
        )}
        {!isUpdateUser && (
          <LabelledTextField
            type="password"
            id="passwordConfirmation"
            label="Password Confirmation"
            name="passwordConfirmation"
            value={targetUser.passwordConfirmation}
            onChange={handleUserChanged}
          />
        )}
      </Box>
    </>
  );
}
