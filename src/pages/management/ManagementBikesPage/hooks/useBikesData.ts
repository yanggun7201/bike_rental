import { useCallback, useEffect } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../../types/UseAxios";
import { getErrorMessage } from "../../../../includes/errorMessage";
import { useSnackbarMessage } from "../../../../hooks/useSnackbarMessage";

const useBikesData = (): UseAxiosResultType => {
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

  const getBikes = useCallback((config) => {
    return getData({
      url: `/bikerental-admin/bikes?includes=ratings,reservations,historyReservations,reservationWithUsers&${config?.params}`
    });
  }, [getData]);

  return [
    {
      data: data,
      loading: loading,
      error: error,
    },
    getBikes,
  ];
}

export default useBikesData;
