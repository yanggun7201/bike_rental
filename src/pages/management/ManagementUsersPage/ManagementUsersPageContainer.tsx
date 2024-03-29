import React, { useCallback, useEffect } from "react";
import { AxiosPromise } from "axios";
import { useSetRecoilState } from "recoil";
import { managementUsersState } from "../../../stores/managementUsers";
import { InputUser, User } from "../../../types/User";
import { useSnackbarMessage } from "../../../hooks/useSnackbarMessage";
import useUsersData from "./hooks/useUsersData";
import { ManagementUsersPage } from "./ManagementUsersPage";
import { PageTitle } from "../../../components/PageTitle";
import useUpdateUser from "./hooks/useUpdateUser";
import useCreateUser from "./hooks/useCreateUser";
import useDeleteUser from "./hooks/useDeleteUser";

export const ManagementUsersPageContainer: React.FC = () => {
  const [{ data: usersData, loading }, getUsers] = useUsersData();
  const [{ data: updateUserData, loading: updateUserLoading }, updateUser] = useUpdateUser();
  const [{ data: createUserData, loading: createUserLoading }, createUser] = useCreateUser();
  const [{ data: deleteUserData, loading: deleteUserLoading }, deleteUser] = useDeleteUser();
  const setUsers = useSetRecoilState(managementUsersState);
  const { showSnackMessage } = useSnackbarMessage();

  const handleUpdateUser = useCallback((user: InputUser, id: number): AxiosPromise => {
    const data = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return updateUser({ params: { userId: id }, data });
  }, [updateUser]);

  const handleCreateUser = useCallback((user: InputUser): AxiosPromise => {
    const data = {
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
      password_confirmation: user.passwordConfirmation,
    };

    return createUser({ data });
  }, [createUser]);

  const handleDeleteUser = useCallback((user: User, id: number): AxiosPromise => {
    return deleteUser({ params: { userId: id } });
  }, [deleteUser]);

  useEffect(() => {
    setUsers(usersData?.status === "success" ? usersData.data.users : []);
  }, [usersData]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (updateUserData?.status === "success") {
      showSnackMessage({ title: "User update success!" });
      getUsers();
    }
  }, [getUsers, updateUserData]);

  useEffect(() => {
    if (createUserData?.status === "success") {
      showSnackMessage({ title: "User create success!" });
      getUsers();
    }
  }, [getUsers, createUserData]);

  useEffect(() => {
    if (deleteUserData?.status === "success") {
      showSnackMessage({ title: "User delete success!" });
      getUsers();
    }
  }, [getUsers, deleteUserData]);

  return (
    <>
      <PageTitle>Users - Management</PageTitle>
      <ManagementUsersPage
        loading={loading}
        updateUser={handleUpdateUser}
        createUser={handleCreateUser}
        deleteUser={handleDeleteUser}
        updateUserLoading={updateUserLoading}
        createUserLoading={createUserLoading}
        deleteUserLoading={deleteUserLoading}
      />
    </>
  )
}
