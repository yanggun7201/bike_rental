import React from "react";
import {
  FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, SxProps,
} from "@mui/material";

interface Props {
  labelId?: string;
  label?: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  enableAll?: boolean;
  sx?: SxProps;
  size?: "small" | "medium";
  error?: string;
}

export const SelectBox: React.FC<Props> = ({
  labelId = "",
  label = "",
  onChange,
  value = "",
  children,
  enableAll = false,
  size = "small",
  sx,
  error,
}) => (
  <FormControl sx={{ m: 1, minWidth: 120, ...sx }} size={size}>
    {label && (
      <InputLabel id={labelId || label}>{label}</InputLabel>
    )}
    <Select
      labelId={labelId || label}
      id={labelId || label}
      value={value}
      label="Age"
      onChange={onChange}
      {...label && { input: (<OutlinedInput label={label} />) }}
    >
      {enableAll && (
        <MenuItem value="All">All</MenuItem>
      )}
      {children}
    </Select>
    {error && (
      <FormHelperText
        id={labelId || label}
        error
        sx={{
          position: "absolute",
          bottom: "-24px"
        }}
      >
        {error}
      </FormHelperText>
    )}
  </FormControl>
);
