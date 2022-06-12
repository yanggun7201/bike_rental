import React from "react";
import { Typography } from "@mui/material"
import { Helmet } from "react-helmet-async";

export const PageTitle: React.FC = ({
  children
}) => (
  <>
    <Helmet>
      <title>Toptal - {children}</title>
    </Helmet>
    <Typography variant="h4" component="h2">
      {children}
    </Typography>
  </>
)
