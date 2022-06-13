import React from "react";
import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";

export const BikeDetailsTextField = (props: TextFieldProps) => (
  <TextField
    margin="normal"
    InputProps={{
      readOnly: true,
    }}
    sx={{ display: "flex" }}
    {...props}
  />
)
