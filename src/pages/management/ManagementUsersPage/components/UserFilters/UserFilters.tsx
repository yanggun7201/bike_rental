import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Divider, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { UserRole, UserRoleSearchType } from "../../../../../types/UserRole";
import { managementUsersFilterState } from "../../../../../stores/managementUsers";

export const UserFilters: React.FC = () => {

  const [usersFilter, setUsersFilter] = useRecoilState(managementUsersFilterState);

  const handleUsersFilter = useCallback((event: React.MouseEvent<HTMLElement>, newUserType: UserRoleSearchType) => {
    setUsersFilter(newUserType);
  }, [setUsersFilter]);

  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ mt: 3, mb: 3 }}
    >
      <Typography variant="h6" sx={{ minWidth: 70 }}>User type</Typography>
      <ToggleButtonGroup exclusive onChange={handleUsersFilter} value={usersFilter} color={"primary"} size={"small"}>
        <ToggleButton value="All" key="All">All</ToggleButton>
        <ToggleButton value={UserRole.USER} key={UserRole.USER}>{UserRole.USER}</ToggleButton>
        <ToggleButton value={UserRole.MANAGER} key={UserRole.MANAGER}>{UserRole.MANAGER}</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
