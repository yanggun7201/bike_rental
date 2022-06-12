import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { withStyle } from "../../styles";
import { useMemo } from "react";
import { To } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTextDecoration(underline: string): any {
  switch (underline) {
    case "hover":
      return {
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline"
        }
      };
    case "none":
    default:
      return { textDecoration: "none" };
  }
}

// export const StyledLink = styled(Link)(() => ({
//   textDecoration: getTextDecoration(underline),
//   color: "inherit",
// }));

type MuiLinkType = {
  underline?: "none" | "hover",
  color?: "inherit",
  to: To,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: any) => void,
  children: React.ReactNode,
} & LinkProps;

export const MuiLink: React.FC<MuiLinkType> = ({
  underline = "none",
  color = "inherit",
  to,
  onClick,
  children,
}) => {
  const StyledLink = useMemo(() => {
    return withStyle(Link, {
      ...getTextDecoration(underline),
      ...color && { color }
    });
  }, [underline, color]);

  return (
    <StyledLink
      {...to && { to }}
      {...onClick && { onClick }}
    >
      {children}
    </StyledLink>
  );
}
