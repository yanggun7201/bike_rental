import React from "react";
import { useRecoilValue } from "recoil";
import { AppBar, Box, Toolbar, } from "@mui/material";
import logo from "../../assets/images/logo.svg";
import { currentUserState } from "../../stores/store";
import { MuiLink } from "../MuiLink";
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
        <MuiLink to={"/"}>
          <Box component="img" alt="Vector Logo." src={logo} sx={{ maxWidth: 95 }} />
        </MuiLink>
        <Box sx={{ flex: 1 }} />
        <Box>
          {currentUserStateValue
            ? (
                <HeaderAvatar userName={currentUserStateValue.name} />
            )
            : (
              <MuiLink to={"/login"}>
                Log in
              </MuiLink>
            )
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};
