import React, { useCallback, useEffect, useMemo, useState } from "react";
import useBikesData from "./hooks/useBikesData";
import { BikesPage } from "./BikesPage";
import useBikeFiltersData from "./hooks/useBikeFiltersData";
import { DefaultBikeFilters } from "../../types/Bike";
import moment from "moment";
import { useSnackbarMessage } from "../../hooks/useSnackbarMessage";
import { PageTitle } from "../../components/PageTitle";

export const BikesPageContainer: React.FC = () => {
  const [{ data: filtersData }, getBikeFilters] = useBikeFiltersData();
  const [{ data: bikesData, loading, error }, getBikes] = useBikesData();
  const [fromDate, setFromDate] = useState<Date | null>(new Date());
  const [toDate, setToDate] = useState<Date | null>(null);
  const { showSnackMessage } = useSnackbarMessage();

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

  const handleSearch = useCallback(() => {
    if (!fromDate) {
      showSnackMessage({ type: "warning", title: "From date is required." });
      return;
    }

    const fromDateMoment = moment(fromDate);
    const toDateMoment = moment(toDate);

    if (!fromDateMoment.isValid()) {
      showSnackMessage({ type: "warning", title: "From date is invalid." });
      return;
    }

    if (toDate && !toDateMoment.isValid()) {
      showSnackMessage({ type: "warning", title: "To date is invalid." });
      return;
    }

    const data = {
      fromDate: fromDateMoment.format("YYYY-MM-DD"),
      ...toDate && { toDate: toDateMoment.format("YYYY-MM-DD") }
    }

    const config = {
      params: new URLSearchParams(data).toString()
    }

    getBikes(config);
  }, [getBikes, fromDate, toDate]);

  useEffect(() => {
    getBikeFilters();
  }, [getBikeFilters]);

  return (
    <>
      <PageTitle>Bikes</PageTitle>
      <BikesPage
        bikes={bikes}
        loading={loading}
        filters={filters}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        onSearch={handleSearch}
      />
    </>
  )
}
