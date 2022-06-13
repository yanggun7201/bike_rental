import React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  onClickCreateBike: () => void;
  loading?: boolean;
}

export const BikeActions: React.FC<Props> = ({
  onClickCreateBike,
  loading = false,
}) => (
  <Stack
    alignItems={"center"}
    direction={"row"}
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}
    sx={{ mt: 3, mb: 3 }}
  >
    <Typography variant="h6" sx={{ minWidth: 70 }}>Actions</Typography>
    <LoadingButton
      size="small"
      variant="contained"
      onClick={onClickCreateBike}
      loading={loading}
      loadingPosition="start"
      startIcon={<SendIcon />}
    >
      Create new bike
    </LoadingButton>
  </Stack>
);
