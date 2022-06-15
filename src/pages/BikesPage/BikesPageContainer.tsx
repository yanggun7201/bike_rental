import React, { useCallback, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import moment from "moment";
import useBikesData from "./hooks/useBikesData";
import useBikeFiltersData from "./hooks/useBikeFiltersData";
import { useSnackbarMessage } from "../../hooks/useSnackbarMessage";
import { DefaultBikeFilters } from "../../types/Bike";
import { bikesFiltersState, bikesSearchRangeState, bikesState } from "../../stores/bikes";
import { BikesPage } from "./BikesPage";
import { PageTitle } from "../../components/PageTitle";

export const BikesPageContainer: React.FC = () => {
  const [{ data: filtersData }, getBikeFilters] = useBikeFiltersData();
  const [{ data: bikesData, loading }, getBikes] = useBikesData();
  const { fromDate, toDate } = useRecoilValue(bikesSearchRangeState)
  const setBikes = useSetRecoilState(bikesState);
  const setFilters = useSetRecoilState(bikesFiltersState);
  const { showSnackMessage } = useSnackbarMessage();

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
    setFilters(filtersData?.status === "success" ? filtersData.data.filters : DefaultBikeFilters);
  }, [filtersData]);

  useEffect(() => {
    setBikes(bikesData?.status === "success" ? bikesData.data.bikes : []);
  }, [bikesData]);

  useEffect(() => {
    getBikeFilters();
  }, [getBikeFilters]);

  return (
    <>
      <PageTitle>Bikes</PageTitle>
      <BikesPage
        loading={loading}
        onSearch={handleSearch}
      />
    </>
  )
}
