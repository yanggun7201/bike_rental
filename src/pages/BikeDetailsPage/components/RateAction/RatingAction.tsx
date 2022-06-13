import React from "react";
import { Divider, Rating as MuiRating, Stack, Typography } from "@mui/material";
import { Loading } from "../../../../components/Loading";

interface Props {
  rating: number | null;
  loading: boolean;
  onRating: (rating: number | null) => void;
}

export const RatingAction: React.FC<Props> = ({
  rating,
  loading,
  onRating,
}) => (
  <Stack
    alignItems={"center"}
    direction={"row"}
    spacing={2}
    sx={{ mt: 4, mb: 2, position: "relative" }}
  >
    <Typography variant="h6" component="h2" sx={{ minWidth: "110px" }}>Rating</Typography>
    <Divider orientation="vertical" flexItem />
    {loading && (<Loading />)}
    <MuiRating
      name="rating"
      value={rating}
      onChange={(event, newValue) => {
        onRating(newValue);
      }}
    />
  </Stack>
);
