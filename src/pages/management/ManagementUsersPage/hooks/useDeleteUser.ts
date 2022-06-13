import { useCallback, useEffect } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../../types/UseAxios";
import { getErrorMessage } from "../../../../includes/errorMessage";
import { useSnackbarMessage } from "../../../../hooks/useSnackbarMessage";

const useDeleteUser = (): UseAxiosResultType => {
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

  const updateUser = useCallback((config) => {

    return getData({
      url: `/bikerental-admin/users/${config?.params?.userId}`,
      ...config,
    });
  }, [getData]);

  return [
    {
      data: data,
      loading: loading,
      error: error,
    },
    updateUser,
  ];
}

export default useDeleteUser;
