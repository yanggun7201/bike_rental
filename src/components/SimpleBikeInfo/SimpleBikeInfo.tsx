import React from "react";
import { Divider, Stack, Typography, } from "@mui/material";
import { Bike } from "../../types/Bike";

interface Props {
  bike: Bike;
}

export const SimpleBikeInfo: React.FC<Props> = ({
  bike,
}) => (
  <Stack
    alignItems={"center"}
    direction={"row"}
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}
    sx={{ mb: 3 }}
  >
    <Typography>{bike.model}</Typography>
    <Typography>{bike.color}</Typography>
    <Typography>{bike.location}</Typography>
  </Stack>
);
