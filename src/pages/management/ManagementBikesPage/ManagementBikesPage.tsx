import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { AxiosPromise } from "axios";
import { Link as RouterLink } from "react-router-dom";
import { Link, Rating } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Bike, EMPTY_BIKE } from "../../../types/Bike";
import { Actions } from "../../../types/Actions";
import { BikeForm } from "./components/BikeForm";
import { isEmpty } from "lodash";
import { BikeReservations } from "./components/BikeReservations";
import { BikeActions } from "./components/BikeActions";

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
  const [selectedBikeForUpdate, setSelectedBikeForUpdate] = useState<Bike | null>(null);
  const [selectedBikeForReservations, setSelectedBikeForReservations] = useState<Bike | null>(null);

  const handleCancelForm = useCallback(() => {
    setSelectedBikeForUpdate(null);
  }, []);

  const handleSelectBike = useCallback((event, bike) => {
    event.preventDefault();
    setSelectedBikeForUpdate(bike);
  }, []);

  const handleCreateBikeClicked = useCallback(() => {
    setSelectedBikeForUpdate(EMPTY_BIKE);
  }, []);

  const handleSelectBikeForReservations = useCallback((event, bike) => {
    event.preventDefault();
    setSelectedBikeForReservations(bike);
  }, []);

  const handleCloseReservationsDialog = useCallback(() => {
    setSelectedBikeForReservations(null);
  }, []);

  const handleUpdateBike = useCallback((bike, action: Actions) => {
    switch (action) {
      case Actions.CREATE:
        return createBike(bike).then(() => setSelectedBikeForUpdate(null));
      case Actions.UPDATE:
        return updateBike(bike, bike.id);
      case Actions.DELETE:
        return deleteBike(bike, bike.id).then(() => setSelectedBikeForUpdate(null));
    }
  }, [updateBike, deleteBike, createBike]);

  const columns = useMemo((): GridColDef[] => {
    return [
      {
        field: 'model',
        headerName: 'Model',
        width: 150,
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <Link
            to={`/`}
            component={RouterLink}
            color={"inherit"}
            underline={"hover"}
            onClick={(event) => handleSelectBike(event, params.row)}
          >
            {params.value}
          </Link>
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
      {
        field: 'id',
        headerName: 'Reservations',
        width: 200,
        renderCell: (params: GridRenderCellParams): ReactNode => {
          if (isEmpty(params.row.reservationWithUsers)) {
            return "";
          }

          return (
            <Link
              to={`/`}
              color={"inherit"}
              underline={"hover"}
              component={RouterLink}
              onClick={(event) => handleSelectBikeForReservations(event, params.row)}
            >
              View
            </Link>
          )
        },
      },
    ];
  }, [handleSelectBike]);

  return (
    <>
      {selectedBikeForUpdate && (
        <BikeForm
          bike={selectedBikeForUpdate}
          onAction={handleUpdateBike}
          onCancelForm={handleCancelForm}
          updateBikeLoading={updateBikeLoading}
          createBikeLoading={createBikeLoading}
          deleteBikeLoading={deleteBikeLoading}
        />
      )}

      {selectedBikeForReservations && (
        <BikeReservations bike={selectedBikeForReservations} onClose={handleCloseReservationsDialog} />
      )}

      <BikeActions onClickCreateBike={handleCreateBikeClicked} loading={loading} />


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
