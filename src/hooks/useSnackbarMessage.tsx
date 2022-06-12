import React, { ReactNode, useCallback } from "react";
import { useSnackbar } from "notistack";
import { AlertColor } from "@mui/material/Alert";
import { SnackbarMessage } from "../components/SnackbarMessage";

interface ShowSnackMessageProps {
  type?: AlertColor;
  title: string | ReactNode;
  body?: string | ReactNode;
}

interface SnackbarMessageProps {
  showSnackMessage: (param: ShowSnackMessageProps) => void;
}

const AUTO_HIDE_DURATION = 5000;

const DEFAULT_TYPE = 'success' as AlertColor;

export const useSnackbarMessage = (): SnackbarMessageProps => {

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const showSnackMessage = useCallback(({
    type = DEFAULT_TYPE,
    title,
    body
  }: ShowSnackMessageProps) => {

    enqueueSnackbar((
        <SnackbarMessage
          title={title}
          type={type}
        >
          {body}
        </SnackbarMessage>
      ),
      {
        variant: "default",
        autoHideDuration: AUTO_HIDE_DURATION,
      }
    );

  }, [enqueueSnackbar, closeSnackbar]);

  return {showSnackMessage};

}
