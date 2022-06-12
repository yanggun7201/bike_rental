import { useCallback, useState } from "react";
import { SelectChangeEvent } from "@mui/material";

const useBikeFilter = <T>(filters: T) => {

  const [selectedFilter, setSelectedModel] = useState<string>("All");

  const handleChangeFilter = useCallback((event: SelectChangeEvent) => {
    setSelectedModel(event.target.value.toString());
  }, []);

  return {
    filters,
    selectedFilter,
    handleChangeFilter
  }
}

export default useBikeFilter;