import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { AxiosPromise } from "axios";
import { isEmpty } from "lodash";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { EMPTY_USER, InputUser, User } from "../../../types/User";
import { UserRole, UserRoleSearchType } from "../../../types/UserRole";
import { Actions } from "../../../types/Actions";
import { UserForm } from "./components/UserForm";
import { UserActions } from "./components/UserActions";
import { UserFilters } from "./components/UserFilters";
import { MuiLink } from "../../../components/MuiLink";
import { UserReservations } from "./components/UserReservations";

interface Props {
  users: User[],
  loading: boolean,
  updateUser: (user: InputUser, id: number) => AxiosPromise;
  deleteUser: (user: InputUser, id: number) => AxiosPromise;
  createUser: (user: InputUser) => AxiosPromise;
  updateUserLoading: boolean;
  deleteUserLoading: boolean;
  createUserLoading: boolean;
}

export const ManagementUsersPage: React.FC<Props> = ({
  users = [],
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
  const [userType, setUserType] = useState<UserRoleSearchType>("All");
  const handleUserTypeChanged = useCallback((event: React.MouseEvent<HTMLElement>, newUserType: UserRoleSearchType) => {
    setUserType(newUserType);
  }, []);

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
          <MuiLink
            to={`/`}
            underline={"hover"}
            onClick={(event) => handleSelectUserForUpdate(event, params.row)}
          >
            {params.value}
          </MuiLink>
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
            <MuiLink
              to={`/`}
              underline={"hover"}
              onClick={(event) => handleSelectUserForReservations(event, params.row)}
            >
              View
            </MuiLink>
          )
        },
      },
    ];
  }, [handleSelectUserForUpdate, handleSelectUserForReservations]);

  const filteredUsers = useMemo(() => {
    switch (userType) {
      case UserRole.MANAGER:
      case UserRole.USER:
        return users.filter(u => u.role === userType);
      case "All":
      default:
        return users;
    }
  }, [users, userType]);

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
      <UserFilters onChangeUserType={handleUserTypeChanged} userType={userType} />

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
