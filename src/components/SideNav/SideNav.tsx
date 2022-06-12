import React, { ReactNode } from "react";
import { Box, CSSObject, List, styled, Theme, Toolbar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

const drawerWidth = 240;

type Props = {
  openSideNav: boolean,
  children: ReactNode,
}
export const SideNav: React.FC<Props> = ({
  openSideNav = false,
  children,
}) => {
  return (
    <div>
      <Drawer
        open={openSideNav}
        variant="permanent"
        data-test={"side-nav"}
      >
        <Toolbar />
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
        >
          <List>
            {children}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

/**
 * Code below here copied from MUI
 * @see https://mui.com/components/drawers/#heading-mini-variant-drawer
 */
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.default,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
  backgroundColor: theme.palette.background.default,
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }),
);