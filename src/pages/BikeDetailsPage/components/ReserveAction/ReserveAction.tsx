import React, { useMemo } from "react";
import { isEmpty } from "lodash";
import moment from "moment";
import { Divider, MenuItem, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { SelectBox } from "../../../../components/SelectBox";
import { DATE_FORMAT } from "../../../../includes/constants";

interface Props {
  date: Date | null;
  onReserveDateChanged: (date: Date | null) => void;
  periodOfTime: string | null;
  onPeriodOfTimeChanged: (event: SelectChangeEvent) => void;
  periodOfTimes: string[];
  onReserveBike: () => void;
  loading: boolean;
}

export const ReserveAction: React.FC<Props> = ({
  date,
  onReserveDateChanged,
  periodOfTime,
  onPeriodOfTimeChanged,
  periodOfTimes,
  onReserveBike,
  loading,
}) => {

  const reservationIsNotAvailable = useMemo(() => {
    return isEmpty(periodOfTimes);
  }, [periodOfTimes]);

  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      spacing={2}
      sx={{ mt: 2, mb: 2 }}
    >
      <Typography variant="h6" component="h2" sx={{ minWidth: "110px" }}>Reservation</Typography>
      <Divider orientation="vertical" flexItem />
      <DatePicker
        label="Date"
        value={date}
        onChange={onReserveDateChanged}
        minDate={new Date()}
        disablePast
        InputProps={{
          readOnly: true,
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <SelectBox
        label="Period of time"
        value={periodOfTime || ""}
        onChange={onPeriodOfTimeChanged}
        sx={{ minWidth: 200 }}
        size={"medium"}
        error={reservationIsNotAvailable ? `Not available on ${moment(date).format(DATE_FORMAT)}` : undefined}
      >
        {periodOfTimes.map(item => (<MenuItem value={item} key={item}>{item}</MenuItem>))}
      </SelectBox>
      <LoadingButton
        size="small"
        variant="contained"
        onClick={onReserveBike}
        loading={loading}
        disabled={reservationIsNotAvailable}
        loadingPosition="start"
        startIcon={<SendIcon />}
      >
        Reserve
      </LoadingButton>
    </Stack>
  );
}