import { useCallback, useEffect } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../../types/UseAxios";
import { getErrorMessage } from "../../../../includes/errorMessage";
import { useSnackbarMessage } from "../../../../hooks/useSnackbarMessage";

const useDeleteBike = (): UseAxiosResultType => {
  const { showSnackMessage } = useSnackbarMessage();
  const [{ data, loading, error }, getData] = useAxios({
      method: 'DELETE',
    },
    { manual: true },
  );

  useEffect(() => {
    if (error) {
      showSnackMessage({ type: "error", title: getErrorMessage(error) });
    }
  }, [error]);

  const updateBike = useCallback((config) => {

    return getData({
      url: `/bikerental-admin/bikes/${config?.params?.bikeId}`,
      ...config,
    });
  }, [getData]);

  return [
    {
      data: data,
      loading: loading,
      error: error,
    },
    updateBike,
  ];
}

export default useDeleteBike;
