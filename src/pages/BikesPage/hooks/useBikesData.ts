import { useCallback } from "react";
import useAxios from "axios-hooks";
import { UseAxiosResultType } from "../../../types/UseAxios";

const useBikesData = (): UseAxiosResultType => {
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
