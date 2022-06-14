import React from "react";
import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";

export const SignUpTextField = (props: TextFieldProps) => (
  <TextField
    margin="normal"
    required
    fullWidth
    {...props}
  />
);
