import { useCallback, useEffect } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../types/UseAxios";
import { getErrorMessage } from "../../../includes/errorMessage";
import { useSnackbarMessage } from "../../../hooks/useSnackbarMessage";

const useBikesData = (): UseAxiosResultType => {
  const { showSnackMessage } = useSnackbarMessage();
  const [{ data, loading, error }, getData] = useAxios({
      method: 'GET',
    },
    { manual: true },
  );

  const getBikes = useCallback((config) => {
    return getData({
      url: `/bikerental/bikes?includes=ratings,reservations,historyReservations,reservationWithUsers&${config?.params}`
    });
  }, [getData]);

  useEffect(() => {
    if (error) {
      showSnackMessage({ type: "error", title: getErrorMessage(error) });
    }
  }, [error]);

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
