import React from "react";
import { Divider, Stack, Typography, } from "@mui/material";
import { User } from "../../types/User";

interface Props {
  user: User;
}

export const SimpleUserInfo: React.FC<Props> = ({
  user,
}) => (
  <Stack
    alignItems={"center"}
    direction={"row"}
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}
    sx={{ mb: 3 }}
  >
    <Typography>{user.email}</Typography>
    <Typography>{user.name}</Typography>
    <Typography>{user.role}</Typography>
  </Stack>
);
