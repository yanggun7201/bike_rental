import React from "react";
import {
  FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent,
} from "@mui/material";

interface Props {
  labelId?: string;
  label?: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  enableAll?: boolean
}

export const SelectBox: React.FC<Props> = ({
  labelId = "",
  label = "",
  onChange,
  value = "",
  children,
  enableAll = false,
}) => (
  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
  </FormControl>
);
