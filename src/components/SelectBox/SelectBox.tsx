import React, { useCallback, useMemo, useState } from "react";
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
import { NOOP } from "../../includes/constants";

interface Props {
  labelId?: string;
  name?: string;
  label?: string;
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
  enableAll?: boolean;
  enableNone?: boolean;
  sx?: SxProps;
  size?: "small" | "medium";
  error?: string;
  fullWidth?: boolean;
  unControlled?: boolean;
}

export const SelectBox: React.FC<Props> = ({
  labelId = "",
  name = "",
  label = "",
  onChange = NOOP,
  value = "",
  children,
  enableAll = false,
  enableNone = false,
  size = "small",
  sx,
  error,
  fullWidth = false,
  unControlled = false,
}) => {

  const [localValue, setLocalValue] = useState<string>(value);
  const handleChange = useCallback((event: SelectChangeEvent) => {
    if (unControlled) {
      setLocalValue(event.target.value);
    }
    onChange(event);
  }, [onChange, unControlled]);

  const selectedValue = useMemo(() => {
    return value || localValue;
  }, [value, localValue]);

  return (
    <FormControl
      sx={{
        mt: 2,
        mb: 1,
        minWidth: 120,
        ...fullWidth && { width: "100%" },
        ...sx
      }}
      size={size}
    >
      {label && (
        <InputLabel id={labelId || label}>{label}</InputLabel>
      )}
      <Select
        fullWidth={fullWidth}
        labelId={labelId || label}
        id={labelId || label}
        value={selectedValue}
        name={name}
        label={label}
        onChange={handleChange}
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
          sx={{ position: "absolute", bottom: "-24px" }}
        >
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
}
