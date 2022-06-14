import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import useAxiosAuth from "./hooks/useAxiosAuth";
import useUser from "./hooks/useUser";
import { Layout } from "./pages/Layout";
import { SignInPage } from "./pages/SignInPage";
import { NotFound } from "./pages/NotFound";
import { BikesPage } from "./pages/BikesPage";
import { BikeDetailsPage } from "./pages/BikeDetailsPage";
import { ManagementLayout } from "./pages/ManagementLayout";
import { ManagementBikesPage } from "./pages/management/ManagementBikesPage";
import { ManagementUsersPage } from "./pages/management/ManagementUsersPage";
import { SignUpPage } from "./pages/SignUpPage";

function App(): ReactElement {
  useUser();
  useAxiosAuth();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BikesPage />} />
          <Route path="bikes" element={<BikesPage />} />
          <Route path="bikes/:bikeId" element={<BikeDetailsPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin" element={<ManagementLayout />}>
          <Route index element={<ManagementBikesPage />} />
          <Route path={"bikes"} element={<ManagementBikesPage />} />
          <Route path={"users"} element={<ManagementUsersPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </LocalizationProvider>
  );
}

export default App;
