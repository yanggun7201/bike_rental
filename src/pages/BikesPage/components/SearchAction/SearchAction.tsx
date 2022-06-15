import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { bikesSearchRangeState } from "../../../../stores/bikes";

interface Props {
  loading: boolean,
  onSearch: () => void;
}

export const SearchAction: React.FC<Props> = ({
  loading = false,
  onSearch,
}) => {
  const [{ fromDate, toDate }, setBikesSearchRange] = useRecoilState(bikesSearchRangeState);

  const setSearchRange = useCallback((keyValue) => {
    setBikesSearchRange(prevState => {
      return {
        ...prevState,
        ...keyValue,
      }
    })
  }, [setBikesSearchRange]);

  const setFromDate = useCallback(fromDate => {
    setSearchRange({ fromDate });
  }, [setSearchRange]);

  const setToDate = useCallback(toDate => {
    setSearchRange({ toDate });
  }, [setSearchRange]);

  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      spacing={2}
      sx={{ mt: 2, mb: 2 }}
    >
      <Typography variant="h6" sx={{ minWidth: 70 }}>Search</Typography>
      <Divider orientation="vertical" flexItem />
      <DatePicker
        label="From"
        value={fromDate}
        onChange={setFromDate}
        minDate={new Date()}
        maxDate={toDate || undefined}
        disablePast
        InputProps={{
          readOnly: true,
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="To"
        value={toDate}
        onChange={setToDate}
        minDate={fromDate || new Date()}
        disablePast
        InputProps={{
          readOnly: true,
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <LoadingButton
        size="small"
        variant="contained"
        onClick={onSearch}
        loading={loading}
        loadingPosition="start"
        startIcon={<SendIcon />}
      >
        Search
      </LoadingButton>
    </Stack>
  )
}
