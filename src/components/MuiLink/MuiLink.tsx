import * as React from "react";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";

export const MuiLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "inherit",
}));
