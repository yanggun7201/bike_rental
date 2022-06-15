import React, { useCallback, useEffect } from "react";
import { AxiosPromise } from "axios";
import { useSetRecoilState } from "recoil";
import { Bike } from "../../../types/Bike";
import { managementBikesState } from "../../../stores/managementBikes";
import useBikesData from "./hooks/useBikesData";
import useUpdateBike from "./hooks/useUpdateBike";
import useCreateBike from "./hooks/useCreateBike";
import useDeleteBike from "./hooks/useDeleteBike";
import { useSnackbarMessage } from "../../../hooks/useSnackbarMessage";
import { ManagementBikesPage } from "./ManagementBikesPage";
import { PageTitle } from "../../../components/PageTitle";

export const ManagementBikesPageContainer: React.FC = () => {
  const [{ data: bikesData, loading }, getBikes] = useBikesData();
  const [{ data: updateBikeData, loading: updateBikeLoading }, updateBike] = useUpdateBike();
  const [{ data: createBikeData, loading: createBikeLoading }, createBike] = useCreateBike();
  const [{ data: deleteBikeData, loading: deleteBikeLoading }, deleteBike] = useDeleteBike();
  const { showSnackMessage } = useSnackbarMessage();
  const setBikes = useSetRecoilState(managementBikesState);

  const handleUpdateBike = useCallback((bike: Bike, id: number): AxiosPromise => {
    const data = {
      model: bike.model,
      location: bike.location,
      color: bike.color,
    };

    return updateBike({ params: { bikeId: id }, data });
  }, [updateBike]);

  const handleCreateBike = useCallback((bike: Bike): AxiosPromise => {
    const data = {
      model: bike.model,
      location: bike.location,
      color: bike.color,
    };

    return createBike({ data });
  }, [createBike]);

  const handleDeleteBike = useCallback((bike: Bike, id: number): AxiosPromise => {
    return deleteBike({ params: { bikeId: id } });
  }, [deleteBike]);

  useEffect(() => {
    setBikes(bikesData?.status === "success" ? bikesData.data.bikes : []);
  }, [bikesData]);

  useEffect(() => {
    getBikes();
  }, [getBikes]);

  useEffect(() => {
    if (updateBikeData?.status === "success") {
      showSnackMessage({ title: "Bike update success!" });
      getBikes();
    }
  }, [getBikes, updateBikeData]);

  useEffect(() => {
    if (createBikeData?.status === "success") {
      showSnackMessage({ title: "Bike create success!" });
      getBikes();
    }
  }, [getBikes, createBikeData]);

  useEffect(() => {
    if (deleteBikeData?.status === "success") {
      showSnackMessage({ title: "Bike delete success!" });
      getBikes();
    }
  }, [getBikes, deleteBikeData]);

  return (
    <>
      <PageTitle>Bikes - Management</PageTitle>
      <ManagementBikesPage
        loading={loading}
        updateBike={handleUpdateBike}
        createBike={handleCreateBike}
        deleteBike={handleDeleteBike}
        updateBikeLoading={updateBikeLoading}
        createBikeLoading={createBikeLoading}
        deleteBikeLoading={deleteBikeLoading}
      />
    </>
  );
}
