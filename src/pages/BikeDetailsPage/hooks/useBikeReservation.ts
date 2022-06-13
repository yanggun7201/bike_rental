import { useCallback, useEffect } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../types/UseAxios";
import { getErrorMessage } from "../../../includes/errorMessage";
import { useSnackbarMessage } from "../../../hooks/useSnackbarMessage";

const useBikeReservation = (): UseAxiosResultType => {
  const { showSnackMessage } = useSnackbarMessage();
  const [{ data, loading, error }, getData] = useAxios({
      method: 'POST',
    },
    { manual: true },
  );

  const reserveBike = useCallback((config) => {
    return getData({
      url: `/bikerental/bikes/${config.params.bikeId}/reserve`,
      ...config,
    });
  }, [getData]);

  useEffect(() => {
    if (error) {
      showSnackMessage({ type: "error", title: getErrorMessage(error) });
    }
  }, [error, showSnackMessage]);

  return [
    {
      data: data,
      loading: loading,
      error: error,
    },
    reserveBike,
  ];
}

export default useBikeReservation;
