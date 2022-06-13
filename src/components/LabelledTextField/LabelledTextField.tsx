import React from "react";
import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";

export const LabelledTextField = (props: TextFieldProps) => (
  <TextField
    margin="normal"
    sx={{ display: "flex", ...props.sx }}
    {...props}
  />
)
