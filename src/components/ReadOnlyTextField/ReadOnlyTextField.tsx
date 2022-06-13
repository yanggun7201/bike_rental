import React from "react";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { LabelledTextField } from "../LabelledTextField";

export const ReadOnlyTextField = (props: TextFieldProps) => (
  <LabelledTextField
    InputProps={{
      readOnly: true,
    }}
    {...props}
  />
)
