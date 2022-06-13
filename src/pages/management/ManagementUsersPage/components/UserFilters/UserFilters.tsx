import React from "react";
import { Divider, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { UserRole, UserRoleSearchType } from "../../../../../types/UserRole";

interface Props {
  userType: UserRoleSearchType;
  onChangeUserType: (event: React.MouseEvent<HTMLElement>, newUserType: UserRoleSearchType) => void;
}

export const UserFilters: React.FC<Props> = ({
  userType,
  onChangeUserType,
}) => (
  <Stack
    alignItems={"center"}
    direction={"row"}
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}
    sx={{ mt: 3, mb: 3 }}
  >
    <Typography variant="h6" sx={{ minWidth: 70 }}>User type</Typography>
    <ToggleButtonGroup exclusive onChange={onChangeUserType} value={userType} color={"primary"} size={"small"}>
      <ToggleButton value="All" key="All">All</ToggleButton>
      <ToggleButton value={UserRole.USER} key={UserRole.USER}>{UserRole.USER}</ToggleButton>
      <ToggleButton value={UserRole.MANAGER} key={UserRole.MANAGER}>{UserRole.MANAGER}</ToggleButton>
    </ToggleButtonGroup>
  </Stack>
);
