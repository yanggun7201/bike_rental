import * as React from 'react';
import { Box } from "@mui/material";
import { PageTitle } from "../../components/PageTitle";

export const NotFound: React.FC = () => (
  <>
    <PageTitle>Not Found</PageTitle>
    <Box sx={{ display: "inline-block" }}>
      <h1>Not Found</h1>
      <p>The page was not found.</p>
    </Box>
  </>
);

