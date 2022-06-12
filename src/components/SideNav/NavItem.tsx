import * as React from "react";
import { MouseEventHandler, ReactNode } from "react";
import {
  useTheme,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconProps
} from "@mui/material";
import { MuiLink } from "../MuiLink";
import { NOOP } from "../../includes/constants";

type Props = {
  icon: React.ReactElement<SvgIconProps>,
  to: string,
  children: ReactNode,
  onClick?: (event: any) => void
}

export const NavItem: React.FC<Props> = ({
  icon,
  to,
  onClick = NOOP,
  children,
}) => {

  const theme = useTheme();

  return (
    <MuiLink onClick={onClick} to={to}>
      <ListItem
        sx={{
          "&:hover": {
            backgroundColor: theme.palette.action.selected
          }
        }}
      >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={children} />
      </ListItem>
    </MuiLink>
  );
}