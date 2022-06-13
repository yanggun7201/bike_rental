import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";

export const Loading: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <CircularProgress sx={{ m: 2 }} />
    </Box>
  );
}