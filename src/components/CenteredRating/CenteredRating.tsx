import { styled } from "@mui/styles";
import { Rating } from "@mui/material";

export const CenteredRating = styled(Rating)(() => ({
  "&.MuiRating-root": {
    top: "calc(50% + 4px)",
    position: "absolute",
    transform: "translateY(-50%)",
    paddingLeft: 8,
  }
}));
