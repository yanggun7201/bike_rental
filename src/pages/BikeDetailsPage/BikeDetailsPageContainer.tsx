import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageTitle } from "../../components/PageTitle";
import { BikeDetailsPage } from "./BikeDetailsPage";
import useBikeDetailsData from "./hooks/useBikeDetailsData";
import { useSnackbarMessage } from "../../hooks/useSnackbarMessage";
import { Loading } from "../../components/Loading";
import useBikeReservation from "./hooks/useBikeReservation";
import useBikeRating from "./hooks/useBikeRating";
import useBikeCancelReservation from "./hooks/useBikeCancelReservation";

type SearchParams = {
  bikeId: string,
};

export const BikeDetailsPageContainer: React.FC = () => {
  const { bikeId } = useParams<SearchParams>();
  const [{ data: bikeData, loading }, getBikeDetails] = useBikeDetailsData();
  const [{ data: reserveBikeData, loading: reserveBikeLoading }, reserveBike] = useBikeReservation();
  const [{
    data: cancelReservationData,
    loading: cancelReservationLoading,
  }, cancelReservation] = useBikeCancelReservation();
  const [{ data: ratingBikeData, loading: ratingBikeLoading }, ratingBike] = useBikeRating();
  const { showSnackMessage } = useSnackbarMessage();
  const navigate = useNavigate();

  const bike = useMemo(() => {
    if (bikeData?.status === "success") {
      return bikeData.data.bike;
    }
    return null;
  }, [bikeData]);

  useEffect(() => {
    if (!bikeId) {
      showSnackMessage({ type: "error", title: "Not Found" });
      navigate(-1);
    }
  }, [bikeId, navigate]);

  useEffect(() => {
    if (bikeId) {
      getBikeDetails({ params: { bikeId } });
    }
  }, [getBikeDetails, bikeId]);

  useEffect(() => {
    if (reserveBikeData?.status === "success") {
      showSnackMessage({ title: "Reservation success!" });
      getBikeDetails({ params: { bikeId } });
    }
  }, [reserveBikeData, getBikeDetails, bikeId, showSnackMessage]);

  useEffect(() => {
    if (ratingBikeData?.status === "success") {
      showSnackMessage({ title: "Rating success!" });
      getBikeDetails({ params: { bikeId } });
    }
  }, [ratingBikeData, getBikeDetails, bikeId]);

  useEffect(() => {
    if (cancelReservationData?.status === "success") {
      showSnackMessage({ title: "Reservation cancel success!" });
      getBikeDetails({ params: { bikeId } });
    }
  }, [cancelReservationData, getBikeDetails, bikeId]);

  return (
    <>
      <PageTitle>Bike Details</PageTitle>
      {(loading || !bike) && (<Loading />)}
      {bike && (
        <BikeDetailsPage
          bike={bike}
          reserveBike={reserveBike}
          loading={reserveBikeLoading}
          ratingBike={ratingBike}
          ratingBikeLoading={ratingBikeLoading}
          cancelReservation={cancelReservation}
          cancelReservationLoading={cancelReservationLoading}
        />
      )}
    </>
  )
}
