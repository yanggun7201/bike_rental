import React from "react";
import { styled } from "@mui/styles";
import { styleFn } from "styled-system";

export const withStyle: styleFn = (Component: React.ElementType, extraStyle?: Record<string, unknown>) => {
  return styled(Component)(() => ({
    position: "relative",
    ...extraStyle,
  }));
}
