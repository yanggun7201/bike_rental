import React from "react";
import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginPage: React.FC<Props> = ({
  onSubmit
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
        <Typography component="h1" variant="h5">Sign in</Typography>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
