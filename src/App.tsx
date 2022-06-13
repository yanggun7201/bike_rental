import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useAxiosAuth from "./hooks/useAxiosAuth";
import useUser from "./hooks/useUser";
import { Layout } from "./pages/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";
import { BikesPage } from "./pages/BikesPage";
import { BikeDetailsPage } from "./pages/BikeDetailsPage";

function App(): ReactElement {

  useUser();
  useAxiosAuth();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="bikes/:bikeId" element={<BikeDetailsPage />} />
          <Route path="bikes" element={<BikesPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
