import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { AxiosPromise } from "axios";
import { Divider, Rating, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { LoadingButton } from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';
import { Bike,  EMPTY_BIKE } from "../../../types/Bike";
import { Actions } from "../../../types/Actions";
import { MuiLink } from "../../../components/MuiLink";
import { BikeForm } from "./components/BikeForm";

interface Props {
  bikes: Bike[],
  loading: boolean,
  updateBike: (bike: Bike, id: number) => AxiosPromise;
  deleteBike: (bike: Bike, id: number) => AxiosPromise;
  createBike: (bike: Bike) => AxiosPromise;
  updateBikeLoading: boolean;
  deleteBikeLoading: boolean;
  createBikeLoading: boolean;
}

export const ManagementBikesPage: React.FC<Props> = ({
  bikes = [],
  loading = false,
  updateBike,
  updateBikeLoading,
  deleteBike,
  deleteBikeLoading,
  createBike,
  createBikeLoading,
}) => {
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const handleCancelForm = useCallback(() => {
    setSelectedBike(null);
  }, []);

  const handleSelectBike = useCallback((event, bike) => {
    event.preventDefault();
    setSelectedBike(bike);
  }, []);

  const handleCreateBikeClicked = useCallback(() => {
    setSelectedBike(EMPTY_BIKE);
  }, []);

  const handleUpdateBike = useCallback((bike, action: Actions) => {
    switch (action) {
      case Actions.CREATE:
        return createBike(bike).then(() => setSelectedBike(null));
      case Actions.UPDATE:
        return updateBike(bike, bike.id);
      case Actions.DELETE:
        return deleteBike(bike, bike.id).then(() => setSelectedBike(null));
    }
  }, [updateBike, deleteBike, createBike]);

  const columns = useMemo((): GridColDef[] => {
    return [
      {
        field: 'model',
        headerName: 'Model',
        width: 150,
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <MuiLink
            to={`/`}
            underline={"hover"}
            onClick={(event) => handleSelectBike(event, params.row)}
          >
            {params.value}
          </MuiLink>
        ),
      },
      {
        field: 'color',
        headerName: 'Color',
        width: 150,
      },
      {
        field: 'location',
        headerName: 'Location',
        width: 300,
      },
      {
        field: 'ratingAverage',
        headerName: 'Rating Average',
        width: 160,
        renderCell: ({ value }: GridRenderCellParams): ReactNode => (
          <Rating name="disabled" value={value} readOnly />
        ),
      },
    ];
  }, [handleSelectBike]);

  console.log('bikes', bikes);

  return (
    <>
      {selectedBike && (
        <BikeForm
          bike={selectedBike}
          onAction={handleUpdateBike}
          onCancelForm={handleCancelForm}
          updateBikeLoading={updateBikeLoading}
          createBikeLoading={createBikeLoading}
          deleteBikeLoading={deleteBikeLoading}
        />
      )}

      <Stack
        alignItems={"center"}
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ mt: 3, mb: 3 }}
      >
        <Typography variant="h6" sx={{ minWidth: 70 }}>Actions</Typography>
        <LoadingButton
          size="small"
          variant="contained"
          onClick={handleCreateBikeClicked}
          loading={loading}
          loadingPosition="start"
          startIcon={<SendIcon />}
        >
          Create new bike
        </LoadingButton>
      </Stack>

      <div style={{ height: 640, width: '100%' }}>
        <DataGrid
          rows={bikes}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableColumnMenu
          disableSelectionOnClick
          loading={loading}
        />
      </div>
    </>
  );
}
