import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import { SelectChangeEvent } from "@mui/material";
import { selectedBikesFiltersState } from "../../../stores/bikes";
import { BikeSelectedFilterKey } from "../../../types/Bike";

const useBikeFilter = (filterKey: BikeSelectedFilterKey) => {

  const [selectedFilters, setSelectedFilters] = useRecoilState(selectedBikesFiltersState);

  const selectedFilter = useMemo(() => {
    return selectedFilters[filterKey];
  }, [selectedFilters]);

  const handleChangeFilter = useCallback((event: SelectChangeEvent) => {
    setSelectedFilters(previousState => {
      return {
        ...previousState,
        [filterKey]: event.target.value.toString(),
      }
    });
  }, []);

  return {
    selectedFilter,
    handleChangeFilter
  }
}

export default useBikeFilter;
