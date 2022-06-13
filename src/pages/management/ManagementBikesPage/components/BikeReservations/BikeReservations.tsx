import React, { ReactNode, useMemo } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Bike } from "../../../../../types/Bike";
import { SimpleBikeInfo } from "../../../../../components/SimpleBikeInfo";

const columns: GridColDef[] = [
  {
    field: 'reserveDate',
    headerName: 'Date',
    width: 100,
  },
  {
    field: 'fromTime',
    headerName: 'Period',
    width: 160,
    renderCell: (params: GridRenderCellParams): ReactNode => (
      <Typography variant="body2">
        {`${params.row.fromTime} ~ ${params.row.toTime}`}
      </Typography>
    ),
  },
  {
    field: 'user',
    headerName: 'User',
    width: 440,
    renderCell: (params: GridRenderCellParams): ReactNode => (
      <Typography variant="body2">
        {`${params.row.user.name} / ${params.row.user.email}`}
      </Typography>
    ),
  },
];


interface Props {
  bike: Bike;
  onClose: () => void;
}

export const BikeReservations: React.FC<Props> = ({
  bike,
  onClose,
}) => {

  const reservations = useMemo(() => {
    return bike.reservationWithUsers ?? [];
  }, [bike]);

  return (
    <Dialog open PaperProps={{ sx: { minWidth: 800, maxWidth: 800 } }}>
      <DialogTitle>Bike reservations</DialogTitle>
      <DialogContent sx={{ pb: 0 }}>

        <SimpleBikeInfo bike={bike} />

        <div style={{ height: 640, width: '100%' }}>
          <DataGrid
            rows={reservations}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
            disableColumnMenu
            disableSelectionOnClick
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
