import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Container, Link, MenuItem, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { SelectBox } from "../../components/SelectBox";
import { UserRole } from "../../types/UserRole";
import { SignUpTextField } from "../SignInPage/components/SignUpTextField";

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}

export const SignUpPage: React.FC<Props> = ({
  onSubmit,
  loading,
}) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar alt="Profile"><LockIcon /></Avatar>
        <Typography component="h1" variant="h5">Login</Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <SignUpTextField id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
          <SignUpTextField id="name" label="Name" name="name" />
          <SelectBox
            label="User Role"
            name="role"
            size="medium"
            fullWidth
            unControlled
          >
            {Object.keys(UserRole).map(item => (<MenuItem value={item} key={item}>{item}</MenuItem>))}
          </SelectBox>
          <SignUpTextField name="password" label="Password" type="password" id="password" />
          <SignUpTextField
            type="password"
            label="Password confirmation"
            name="passwordConfirmation"
            id="passwordConfirmation"
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            loadingPosition="start"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<LoginIcon />}
          >
            Sign up
          </LoadingButton>
          <Box>
            <Link
              to={"/signin"}
              underline={"always"}
              component={RouterLink}
            >
              Already have an account? Log in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
