import React from "react";
import { useRecoilValue } from "recoil";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Box, Link, Toolbar, } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { currentUserState } from "../../stores/store";
import { HeaderAvatar } from "./HeaderAvatar";

export const Header: React.FC = ({
  children,
}) => {

  const currentUserStateValue = useRecoilValue(currentUserState);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
        boxShadow: "none",
        borderBottom: "1px solid #ccc",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {children}
        <Link to={"/"} component={RouterLink}>
          <Box component="img" alt="Toptal Bike Logo" src={logo} sx={{ maxWidth: 95 }} />
        </Link>
        <Box sx={{ flex: 1 }} />
        <Box>
          {currentUserStateValue
            ? (
                <HeaderAvatar userName={currentUserStateValue.name} />
            )
            : (
              <Link to={"/signin"} color={"inherit"} underline={"hover"} component={RouterLink}>
                Log in
              </Link>
            )
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};
