import React, { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Box, SelectChangeEvent } from "@mui/material"
import { Bike } from "../../types/Bike";
import { useSnackbarMessage } from "../../hooks/useSnackbarMessage";
import { getPeriodOfTimes } from "../../includes/periodOfTimes";
import { DATE_FORMAT } from "../../includes/constants";
import { UseAxiosActionType } from "../../types/UseAxios";
import { StyledRating } from "./components/StyledRating";
import { BikeDetailsTextField } from "./components/BikeDetailsTextField";
import { ReserveAction } from "./components/ReserveAction";
import { Reservations } from "./components/Reservations";
import { isEmpty } from "lodash";
import useUser from "../../hooks/useUser";
import { RatingAction } from "./components/RateAction";

interface Props {
  bike: Bike;
  reserveBike: UseAxiosActionType;
  loading: boolean;
  ratingBike: UseAxiosActionType;
  ratingBikeLoading: boolean;
  cancelReservation: UseAxiosActionType;
  cancelReservationLoading: boolean;
}

export const BikeDetailsPage: React.FC<Props> = ({
  bike,
  reserveBike,
  ratingBike,
  loading,
  ratingBikeLoading,
  cancelReservation,
  cancelReservationLoading,
}) => {
  const user = useUser();
  const [reserveDate, setReserveDate] = useState<Date | null>(new Date());
  const [rating, setRating] = useState<number | null>(null);
  const [periodOfTime, setPeriodOfTime] = useState<string | null>(null);
  const { showSnackMessage } = useSnackbarMessage();

  const handlePeriodOfTimeChanged = useCallback((event: SelectChangeEvent) => {
    setPeriodOfTime(event.target.value);
  }, []);

  const handleReserveBike = useCallback(() => {
    if (!periodOfTime) {
      showSnackMessage({ type: "error", title: "Period of time is required." });
      return;
    }
    if (!reserveDate) {
      showSnackMessage({ type: "error", title: "Date is required." });
      return;
    }

    const splitPeriodOfTime = periodOfTime.split("~");
    reserveBike({
      params: { bikeId: bike.id },
      data: {
        reserveDate: moment(reserveDate).format(DATE_FORMAT),
        fromTime: splitPeriodOfTime[0].trim(),
        toTime: splitPeriodOfTime[1].trim(),
      }
    });
  }, [bike, reserveBike, reserveDate, periodOfTime]);

  const periodOfTimes = useMemo(() => {
    return getPeriodOfTimes(bike.reservations, reserveDate)
  }, [bike, reserveDate]);

  const userReservations = useMemo(() => {
    if (!bike || !user) {
      return [];
    }
    return (bike?.reservations?.filter(item => item.userId === user.id) ?? []).reverse();
  }, [bike, user]);

  const userRating = useMemo(() => {
    if (!bike || !user) {
      return null;
    }
    const userRating = bike?.ratings?.find(item => item.userId === user.id && item.bikeId === bike.id);

    if (userRating) {
      return userRating;
    }

    const reservation = userReservations.find(item => item.userId === user.id && item.bikeId === bike.id);

    if (reservation) {
      return {
        id: -1,
        bikeId: bike.id,
        userId: user.id,
        rating: 0,
      }
    }
  }, [bike, user, userReservations]);

  const handleRatingBike = useCallback((newRating: number | null) => {
    setRating(newRating);
    if (newRating) {
      ratingBike({
        params: { bikeId: bike.id },
        data: { rating: newRating }
      });
    }
  }, [ratingBike, bike]);

  useEffect(() => {
    if (userRating) {
      setRating(userRating.rating);
    }
  }, [userRating]);

  return (
    <>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <BikeDetailsTextField id="model" label="Bike Model" name="model" value={bike.model} />
        <BikeDetailsTextField id="color" label="Bike Color" name="color" value={bike.color} />
        <BikeDetailsTextField id="location" label="Bike Location" name="location" value={bike.location} />
        <Box sx={{ position: "relative", width: "100%" }}>
          <BikeDetailsTextField id="ratingAverage" label="Bike Rating Average" name="ratingAverage" value={" "} />
          <StyledRating name="ratingAverage" value={bike.ratingAverage} readOnly />
        </Box>
      </Box>

      <ReserveAction
        date={reserveDate}
        onReserveDateChanged={setReserveDate}
        periodOfTime={periodOfTime}
        onPeriodOfTimeChanged={handlePeriodOfTimeChanged}
        periodOfTimes={periodOfTimes}
        onReserveBike={handleReserveBike}
        loading={loading}
      />

      {userRating && (
        <RatingAction rating={rating} onRating={handleRatingBike} loading={ratingBikeLoading} />
      )}

      {!isEmpty(userReservations) && (
        <Reservations
          reservations={userReservations}
          cancelReservation={cancelReservation}
          cancelReservationLoading={cancelReservationLoading}
        />
      )}
    </>
  )
}
