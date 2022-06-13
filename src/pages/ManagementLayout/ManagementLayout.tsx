import React, { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Box, Divider, IconButton, Toolbar } from "@mui/material";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from '@mui/icons-material/People';
import { Header } from "../../components/Header";
import { NavItem, SideNav } from "../../components/SideNav";
import { logout, setToken } from "../../includes/auth";
import { currentUserState } from "../../stores/store";

export const ManagementLayout: React.FC = ({
  children
}) => {
  const setCurrentUserState = useSetRecoilState(currentUserState);
  const [openSideNav, setOpenSideNav] = useState(true);

  const toggleDrawer = useCallback(() => {
    setOpenSideNav(prev => !prev);
  }, []);

  const handleLogout = useCallback((event) => {
    event.preventDefault();
    logout().finally(() => {
      setToken(null);
      setCurrentUserState(null);
    })
  }, [logout, setCurrentUserState]);

  return (
    <Box sx={{ display: "flex", p: 0 }}>
      <Header>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      </Header>

      <SideNav openSideNav={openSideNav}>
        <NavItem icon={<DirectionsBikeIcon />} to={"bikes"}>Bikes</NavItem>
        <NavItem icon={<PeopleIcon />} to={"users"}>Users/Managers</NavItem>
        <Divider />
        <NavItem icon={<LogoutIcon />} to={"/logout"} onClick={handleLogout}>Logout</NavItem>
      </SideNav>

      <Box component="main" sx={{ flexGrow: 1, p: 3, position: "relative" }}>
        <Toolbar />
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
