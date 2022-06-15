import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import theme from "./theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { SnackbarMessageProvider } from "./context/SnackbarMessageContext";
import { LoadingProvider } from "./context/LoadingContext";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <SnackbarMessageProvider>
            <LoadingProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </LoadingProvider>
          </SnackbarMessageProvider>
        </ThemeProvider>
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
