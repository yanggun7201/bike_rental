import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { AxiosPromise } from "axios";
import { isEmpty } from "lodash";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useRecoilValue } from "recoil";
import { filteredManagementUsersState } from "../../../stores/managementUsers";
import { EMPTY_USER, InputUser, User } from "../../../types/User";
import { Actions } from "../../../types/Actions";
import { UserForm } from "./components/UserForm";
import { UserActions } from "./components/UserActions";
import { UserFilters } from "./components/UserFilters";
import { UserReservations } from "./components/UserReservations";

interface Props {
  loading: boolean,
  updateUser: (user: InputUser, id: number) => AxiosPromise;
  deleteUser: (user: InputUser, id: number) => AxiosPromise;
  createUser: (user: InputUser) => AxiosPromise;
  updateUserLoading: boolean;
  deleteUserLoading: boolean;
  createUserLoading: boolean;
}

export const ManagementUsersPage: React.FC<Props> = ({
  loading = false,
  updateUser,
  updateUserLoading,
  deleteUser,
  deleteUserLoading,
  createUser,
  createUserLoading,
}) => {
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState<User | null>(null);
  const [selectedUserForReservations, setSelectedUserForReservations] = useState<User | null>(null);
  const filteredUsers = useRecoilValue(filteredManagementUsersState);

  const handleCancelForm = useCallback(() => {
    setSelectedUserForUpdate(null);
  }, []);

  const handleSelectUserForUpdate = useCallback((event, user) => {
    event.preventDefault();
    setSelectedUserForUpdate(user);
  }, []);

  const handleSelectUserForReservations = useCallback((event, user) => {
    event.preventDefault();
    setSelectedUserForReservations(user);
  }, []);

  const handleCloseReservationsDialog = useCallback(() => {
    setSelectedUserForReservations(null);
  }, []);

  const handleCreateUserClicked = useCallback(() => {
    setSelectedUserForUpdate(EMPTY_USER);
  }, []);

  const handleUpdateUser = useCallback((user, action: Actions) => {
    switch (action) {
      case Actions.CREATE:
        return createUser(user).then(() => setSelectedUserForUpdate(null));
      case Actions.UPDATE:
        return updateUser(user, user.id);
      case Actions.DELETE:
        return deleteUser(user, user.id).then(() => setSelectedUserForUpdate(null));
    }
  }, [updateUser, deleteUser, createUser]);

  const columns = useMemo((): GridColDef[] => {
    return [
      {
        field: 'email',
        headerName: 'Email',
        width: 300,
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <Link
            to={`/`}
            color={"inherit"}
            underline={"hover"}
            component={RouterLink}
            onClick={(event) => handleSelectUserForUpdate(event, params.row)}
          >
            {params.value}
          </Link>
        ),
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 300,
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 200,
      },
      {
        field: 'id',
        headerName: 'Reservations',
        width: 200,
        renderCell: (params: GridRenderCellParams): ReactNode => {
          if (isEmpty(params.row.reservationWithBikes)) {
            return "";
          }

          return (
            <Link
              to={`/`}
              color={"inherit"}
              underline={"hover"}
              component={RouterLink}
              onClick={(event) => handleSelectUserForReservations(event, params.row)}
            >
              View
            </Link>
          )
        },
      },
    ];
  }, [handleSelectUserForUpdate, handleSelectUserForReservations]);

  return (
    <>
      {selectedUserForUpdate && (
        <UserForm
          user={selectedUserForUpdate}
          onAction={handleUpdateUser}
          onCancelForm={handleCancelForm}
          updateUserLoading={updateUserLoading}
          createUserLoading={createUserLoading}
          deleteUserLoading={deleteUserLoading}
        />
      )}

      {selectedUserForReservations && (
        <UserReservations
          user={selectedUserForReservations}
          onClose={handleCloseReservationsDialog}
        />
      )}

      <UserActions onClickCreateUser={handleCreateUserClicked} loading={loading} />
      <UserFilters />

      <div style={{ height: 640, width: '100%' }}>
        <DataGrid
          rows={filteredUsers}
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
