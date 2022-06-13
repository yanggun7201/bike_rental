import { useCallback, useEffect } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../../types/UseAxios";
import { getErrorMessage } from "../../../../includes/errorMessage";
import { useSnackbarMessage } from "../../../../hooks/useSnackbarMessage";

const useUsersData = (): UseAxiosResultType => {
  const { showSnackMessage } = useSnackbarMessage();
  const [{ data, loading, error }, getData] = useAxios({
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    if (error) {
      showSnackMessage({ type: "error", title: getErrorMessage(error) });
    }
  }, [error]);

  const getUsers = useCallback((config) => {
    return getData({
      url: `/bikerental-admin/users?includes=ratings,reservations,historyReservations,reservationWithBikes&${config?.params}`
    });
  }, [getData]);

  return [
    {
      data: data,
      loading: loading,
      error: error,
    },
    getUsers,
  ];
}

export default useUsersData;
