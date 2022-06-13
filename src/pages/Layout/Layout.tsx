import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { Box, Divider, IconButton, Toolbar } from "@mui/material";
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from "@mui/icons-material/Menu";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Header } from "../../components/Header";
import { NavItem, SideNav } from "../../components/SideNav";
import { logout, setToken } from "../../includes/auth";
import { currentUserState } from "../../stores/store";
import { UserRole } from "../../types/UserRole";

export const Layout: React.FC = ({
  children
}) => {
  const [user, setCurrentUserState] = useRecoilState(currentUserState);
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
        <NavItem icon={<DirectionsBikeIcon />} to={"/bikes"}>Bikes</NavItem>
        {/*<NavItem icon={<ListAltIcon />} to={"/reservations"}>Reservations</NavItem>*/}
        {user && (<Divider />)}
        {(user && user.role === UserRole.MANAGER) && (
          <NavItem icon={<ManageAccountsIcon />} to={"/admin"}>Management</NavItem>
        )}
        {user && (<NavItem icon={<LogoutIcon />} to={"/logout"} onClick={handleLogout}>Logout</NavItem>)}
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
