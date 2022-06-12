import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import useAxiosAuth from "./hooks/useAxiosAuth";
import useUser from "./hooks/useUser";
import { LoadingProvider } from "./context/LoadingContext";
import { SnackbarMessageProvider } from "./context/SnackbarMessageContext";
import { Layout } from "./pages/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";

function App(): ReactElement {

  useUser();
  useAxiosAuth();

  return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
  );
}

export default App;
