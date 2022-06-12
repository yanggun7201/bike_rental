import React from "react";
import { Helmet } from "react-helmet-async";
import { Typography } from "@mui/material";
import { MuiLink } from "../../components/MuiLink";

export const HomePage: React.FC = () => (
  <>
    <Helmet>
      <title>Home Page</title>
    </Helmet>
    <Typography>Home Page</Typography>
    <MuiLink to={"/reservations"}>reservations</MuiLink>
  </>
);
