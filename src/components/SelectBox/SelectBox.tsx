import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";

interface Props {
  labelId?: string;
  name?: string;
  label?: string;
  value?: string;
  onChange: (event: SelectChangeEvent) => void;
  enableAll?: boolean;
  enableNone?: boolean;
  sx?: SxProps;
  size?: "small" | "medium";
  error?: string;
  fullWidth?: boolean
}

export const SelectBox: React.FC<Props> = ({
  labelId = "",
  name = "",
  label = "",
  onChange,
  value = "",
  children,
  enableAll = false,
  enableNone = false,
  size = "small",
  sx,
  error,
  fullWidth = false,
}) => (
  <FormControl sx={{ mt: 2, mb: 1, minWidth: 120, ...sx }} size={size}>
    {label && (
      <InputLabel id={labelId || label}>{label}</InputLabel>
    )}
    <Select
      fullWidth={fullWidth}
      labelId={labelId || label}
      id={labelId || label}
      value={value}
      name={name}
      label={label}
      onChange={onChange}
      {...label && { input: (<OutlinedInput label={label} />) }}
    >
      {enableNone && (
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
      )}
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
