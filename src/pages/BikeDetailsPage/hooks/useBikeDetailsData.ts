import { useCallback, useEffect } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../types/UseAxios";
import { getErrorMessage } from "../../../includes/errorMessage";
import { useSnackbarMessage } from "../../../hooks/useSnackbarMessage";

const useBikeDetailsData = (): UseAxiosResultType => {
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
  }, [error, showSnackMessage]);

  const getBikes = useCallback((config) => {
    return getData({
      url: `/bikerental/bikes/${config.params.bikeId}?includes=ratings,reservations,reservationWithUsers`
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

export default useBikeDetailsData;
