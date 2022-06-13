import { useCallback } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../types/UseAxios";

const useBikeFiltersData = (): UseAxiosResultType => {
  const [{ data, loading, error }, getData] = useAxios({
      method: 'GET',
    },
    { manual: true },
  );

  const getFilters = useCallback(() => {
    return getData({
      url: `/bikerental/bikefilters`
    });
  }, [getData]);

  return [
    {
      data,
      loading,
      error,
    },
    getFilters,
  ];
}

export default useBikeFiltersData;
