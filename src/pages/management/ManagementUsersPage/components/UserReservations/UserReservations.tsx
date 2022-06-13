import React, { ReactNode, useMemo } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { User } from "../../../../../types/User";
import { SimpleUserInfo } from "../../../../../components/SimpleUserInfo";

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
    field: 'bike',
    headerName: 'Bike',
    width: 440,
    renderCell: (params: GridRenderCellParams): ReactNode => (
      <Typography variant="body2">
        {`${params.row.bike.model} / ${params.row.bike.color} / ${params.row.bike.location}`}
      </Typography>
    ),
  },
];


interface Props {
  user: User;
  onClose: () => void;
}

export const UserReservations: React.FC<Props> = ({
  user,
  onClose,
}) => {

  const reservations = useMemo(() => {
    return user.reservationWithBikes ?? [];
  }, [user]);

  return (
    <Dialog open PaperProps={{ sx: { minWidth: 800, maxWidth: 800 } }}>
      <DialogTitle>User reservations</DialogTitle>
      <DialogContent sx={{ pb: 0 }}>

        <SimpleUserInfo user={user} />

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
