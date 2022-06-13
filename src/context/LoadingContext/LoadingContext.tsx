import React, { createContext, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

interface GlobalLoadingContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const DEFAULT: GlobalLoadingContext = {
  loading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading: () => {
  },
}

export const LoadingContext = createContext<GlobalLoadingContext>(DEFAULT);

export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </LoadingContext.Provider>
  )
};
