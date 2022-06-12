import React, { useEffect, useMemo } from "react";
import useBikesData from "./hooks/useBikesData";
import { BikesPage } from "./BikesPage";
import useBikeFiltersData from "./hooks/useBikeFiltersData";
import { DefaultBikeFilters } from "../../types/Bike";

export const BikesPageContainer: React.FC = () => {
  const [{ data: filtersData }, getBikeFilters] = useBikeFiltersData();
  const [{ data: bikesData, loading, error }, getBikes] = useBikesData();

  const bikes = useMemo(() => {
    if (bikesData?.status === "success") {
      return bikesData.data.bikes;
    }
    return [];
  }, [bikesData]);

  const filters = useMemo(() => {
    if (filtersData?.status === "success") {
      return filtersData.data.filters;
    }
    return DefaultBikeFilters;
  }, [filtersData]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    getBikes();
  }, [getBikes]);

  useEffect(() => {
    getBikeFilters();
  }, [getBikeFilters]);

  return (
    <BikesPage
      bikes={bikes}
      loading={loading}
      filters={filters}
    />
  )
}
