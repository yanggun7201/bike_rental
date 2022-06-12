import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import useAxiosAuth from "./hooks/useAxiosAuth";
import useUser from "./hooks/useUser";
import { Layout } from "./pages/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";
import { BikesPage } from "./pages/BikesPage";

function App(): ReactElement {

  useUser();
  useAxiosAuth();

  return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="bikes" element={<BikesPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
  );
}

export default App;
