import React from "react";
import { Avatar, Box, Container, Link, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { LoadingButton } from "@mui/lab";
import LoginIcon from '@mui/icons-material/Login';
import { Link as RouterLink } from "react-router-dom";

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}

export const SignInPage: React.FC<Props> = ({
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
            Sign in
          </LoadingButton>
          <Box>
            <Link
              to={"/signup"}
              underline={"always"}
              component={RouterLink}
            >
              {`Don't have an account? Sign Up`}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
