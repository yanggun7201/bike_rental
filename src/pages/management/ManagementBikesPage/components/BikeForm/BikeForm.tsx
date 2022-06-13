import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { ReadOnlyTextField } from "../../../../../components/ReadOnlyTextField";
import { CenteredRating } from "../../../../../components/CenteredRating";
import { Bike, EMPTY_BIKE } from "../../../../../types/Bike";
import { Actions } from "../../../../../types/Actions";
import { LabelledTextField } from "../../../../../components/LabelledTextField";
import { useSnackbarMessage } from "../../../../../hooks/useSnackbarMessage";
import moment from "moment";

interface Props {
  bike: Bike | null,
  onAction: (bike: Bike, action: Actions) => void;
  onCancelForm: () => void;
  updateBikeLoading: boolean;
  deleteBikeLoading: boolean;
  createBikeLoading: boolean;
}

const hasFutureReservations = (targetBike: Bike): boolean => {
  const now = moment();
  return !!targetBike.reservations?.some(item => {
    const reserveDateMoment = moment(item.reserveDate).hours(Number(item.fromTime.split(":")[0]));
    return reserveDateMoment.isAfter(now);
  });
}

export const BikeForm: React.FC<Props> = ({
  bike,
  onCancelForm,
  onAction,
  updateBikeLoading = false,
  deleteBikeLoading = false,
  createBikeLoading = false,
}) => {

  const [targetBike, setTargetBike] = useState<Bike>(EMPTY_BIKE);
  const { showSnackMessage } = useSnackbarMessage();

  const handleBikeChanged = useCallback((event) => {
    setTargetBike(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    });
  }, [targetBike]);

  const handleSaveBike = useCallback((event) => {
    event.preventDefault();
    onAction(targetBike, targetBike.id > 0 ? Actions.UPDATE : Actions.CREATE);
  }, [targetBike]);

  const handleDeleteBike = useCallback((event) => {
    event.preventDefault();

    if (hasFutureReservations(targetBike)) {
      showSnackMessage({ type: "error", title: "Delete Error", body: "There are some future reservations!" });
      return;
    }

    onAction(targetBike, Actions.DELETE);
  }, [targetBike]);

  const isUpdateBike = useMemo(() => {
    return targetBike.id > 0;
  }, [targetBike]);

  const isActionProcessing = useMemo(() => {
    return updateBikeLoading || deleteBikeLoading || createBikeLoading;
  }, [updateBikeLoading, deleteBikeLoading, createBikeLoading]);

  useEffect(() => {
    if (bike) {
      setTargetBike({ ...bike });
    }
  }, [bike]);

  return (
    <>
      <Stack
        alignItems={"center"}
        direction={"row"}
        spacing={2}
        sx={{ mt: 4, mb: 0 }}
      >
        <Typography variant="h6" sx={{ minWidth: 70 }}>
          {isUpdateBike
            ? (`Update Bike (#${targetBike.id})`)
            : ("Create Bike")
          }
        </Typography>
        <Divider orientation="vertical" flexItem />
        <LoadingButton
          size="small"
          variant="contained"
          onClick={handleSaveBike}
          disabled={isActionProcessing}
          loading={updateBikeLoading || createBikeLoading}
          loadingPosition="start"
          startIcon={<CheckIcon />}
        >
          {isUpdateBike ? "Save" : "Create"}
        </LoadingButton>
        {isUpdateBike && (
          <LoadingButton
            size="small"
            color="error"
            variant="contained"
            onClick={handleDeleteBike}
            disabled={isActionProcessing}
            loading={deleteBikeLoading}
            loadingPosition="start"
            startIcon={<DeleteForeverIcon />}
          >
            Delete
          </LoadingButton>
        )}
        <LoadingButton
          size="small"
          variant="outlined"
          onClick={onCancelForm}
          disabled={isActionProcessing}
          loadingPosition="start"
          startIcon={<DoDisturbOnIcon />}
        >
          Cancel
        </LoadingButton>
      </Stack>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <LabelledTextField
          id="model"
          label="Bike Model"
          name="model"
          value={targetBike.model}
          onChange={handleBikeChanged}
        />
        <LabelledTextField
          id="color"
          label="Bike Color"
          name="color"
          value={targetBike.color}
          onChange={handleBikeChanged}
        />
        <LabelledTextField
          id="location"
          label="Bike Location"
          name="location"
          value={targetBike.location}
          onChange={handleBikeChanged}
        />
        {isUpdateBike && (
          <Box sx={{ position: "relative", width: "100%" }}>
            <ReadOnlyTextField id="ratingAverage" label="Bike Rating Average" name="ratingAverage" value={" "} />
            <CenteredRating name="ratingAverage" value={targetBike.ratingAverage} readOnly />
          </Box>
        )}
      </Box>
    </>
  );
}
