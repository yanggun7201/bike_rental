import React, { ReactNode, useCallback, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Link, Typography } from "@mui/material";
import { UseAxiosActionType } from "../../../../types/UseAxios";
import { Reservation } from "../../../../types/Reservation";

interface Props {
  reservations: Reservation[];
  cancelReservation: UseAxiosActionType;
  cancelReservationLoading: boolean;
}

export const Reservations: React.FC<Props> = ({
  reservations,
  cancelReservation,
  cancelReservationLoading,
}) => {

  const handleCancelReservation = useCallback((event, reservation) => {
    event.preventDefault();
    cancelReservation({
      params: {
        bikeId: reservation.bikeId,
        reservationId: reservation.id,
      }
    });
  }, [cancelReservation]);

  const columns = useMemo((): GridColDef[] => {
    return [
      {
        field: 'reserveDate',
        headerName: 'Reservation Date',
        width: 200,
      },
      {
        field: 'fromTime',
        headerName: 'From',
        width: 150,
      },
      {
        field: 'toTime',
        headerName: 'To',
        width: 150,
      },
      {
        field: 'cancellable',
        headerName: 'Cancel Reservation',
        width: 200,
        renderCell: (params: GridRenderCellParams): ReactNode => {
          if (params.value) {
            return (
              <Link
                component={RouterLink}
                color={"inherit"}
                to="/reservation/cancel"
                underline={"hover"}
                onClick={(event) => {
                  if (cancelReservationLoading) {
                    event.preventDefault();
                    return;
                  }
                  handleCancelReservation(event, params.row);
                }}
              >
                Cancel
              </Link>
            )
          } else {
            return "";
          }
        },
      },
    ];
  }, [handleCancelReservation, cancelReservationLoading]);

  const rows = useMemo(() => {
    const now = moment();
    return reservations.map(item => {
      const reserveDateMoment = moment(item.reserveDate).hours(Number(item.fromTime.split(":")[0]));

      return {
        ...item,
        cancellable: reserveDateMoment.isAfter(now),
      }
    });
  }, [reservations]);

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5" component="h2">Reservation History</Typography>
      <div style={{ height: 371, width: '100%', marginTop: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection={false}
          disableColumnMenu
          disableSelectionOnClick
          loading={cancelReservationLoading}
        />
      </div>
    </Box>
  );
}
