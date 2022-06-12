import React from "react";
import { SnackbarProvider } from "notistack";
import { makeStyles } from "@mui/styles";
import { TransitionProps } from "@mui/material/transitions";
import { Slide } from "@mui/material";

export const DEFAULT_MAX_SNACK = 5;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Transition(props: TransitionProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Slide {...props} direction="right" />;
}

const useStyles = makeStyles({
  root: {
    padding: 0,
    "& .SnackbarContent-root": {
      padding: "0 !important",
    },
    "& .SnackbarItem-message": {
      padding: "0 !important",
      flexGrow: "1",
    }
  }
});

interface Props {
  children: React.ReactNode;
}

export const SnackbarMessageProvider: React.FC<Props> = ({
  children
}) => {

  const classes = useStyles();

  return (
    <SnackbarProvider
      maxSnack={DEFAULT_MAX_SNACK}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      hideIconVariant
      dense={false}
      TransitionComponent={Transition}
      classes={{ root: classes.root }}
    >
      {children}
    </SnackbarProvider>
  );
}
