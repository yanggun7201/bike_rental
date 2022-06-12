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
  // return [
  //   {
  //     data : {
  //       success: true,
  //       data: {
  //         filters: {
  //           models: ["m1", "m2"],
  //           colors: ["red", "blue"],
  //           locations: ["location 1", "location 2 - birkenhead"],
  //           ratings: [1, 2, 3, 4, 5]
  //         }
  //       }
  //     },
  //     loading : false,
  //     error : null,
  //   },
  //   getFilters,
  // ];
}

export default useBikeFiltersData;
