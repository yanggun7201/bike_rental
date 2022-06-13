import { useCallback, useEffect } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../types/UseAxios";
import { getErrorMessage } from "../../../includes/errorMessage";
import { useSnackbarMessage } from "../../../hooks/useSnackbarMessage";

const useBikeRating = (): UseAxiosResultType => {
  const { showSnackMessage } = useSnackbarMessage();
  const [{ data, loading, error }, getData] = useAxios({
      method: 'POST',
    },
    { manual: true },
  );

  useEffect(() => {
    if (error) {
      showSnackMessage({ type: "error", title: getErrorMessage(error) });
    }
  }, [error, showSnackMessage]);

  const ratingBike = useCallback((config) => {
    return getData({
      url: `/bikerental/bikes/${config.params.bikeId}/rating`,
      ...config,
    });
  }, [getData]);

  return [
    {
      data: data,
      loading: loading,
      error: error,
    },
    ratingBike,
  ];
}

export default useBikeRating;
