import React from "react";
import { useRecoilValue } from "recoil";
import { Divider, MenuItem, Stack, Typography } from "@mui/material";
import { bikesFiltersState } from "../../../../stores/bikes";
import { SelectBox } from "../../../../components/SelectBox";
import useBikeFilter from "../../hooks/useBikeFilter";

export const Filters: React.FC = () => {
  const filters = useRecoilValue(bikesFiltersState);

  const modelFilters = filters?.models;
  const colorFilters = filters?.colors;
  const locationFilters = filters?.locations;
  const ratingFilters = filters?.ratings;

  const { selectedFilter: selectedModel, handleChangeFilter: handleChangeModel } = useBikeFilter("model");
  const { selectedFilter: selectedColor, handleChangeFilter: handleChangeColor } = useBikeFilter("color");
  const { selectedFilter: selectedLocation, handleChangeFilter: handleChangeLocation } = useBikeFilter("location");
  const { selectedFilter: selectedRating, handleChangeFilter: handleChangeRating } = useBikeFilter("rating");

  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ mt: 3, mb: 3 }}
    >
      <Typography variant="h6" sx={{ minWidth: 70 }}>Filter</Typography>
      <SelectBox enableAll label="Model" value={selectedModel} onChange={handleChangeModel}>
        {modelFilters.map(filter => (<MenuItem value={filter} key={filter}>{filter}</MenuItem>))}
      </SelectBox>
      <SelectBox enableAll label="Color" value={selectedColor} onChange={handleChangeColor}>
        {colorFilters.map(filter => (<MenuItem value={filter} key={filter}>{filter}</MenuItem>))}
      </SelectBox>
      <SelectBox enableAll label="Location" value={selectedLocation} onChange={handleChangeLocation}>
        {locationFilters.map(filter => (<MenuItem value={filter} key={filter}>{filter}</MenuItem>))}
      </SelectBox>
      <SelectBox enableAll label="Rating Average" value={selectedRating} onChange={handleChangeRating}>
        {ratingFilters.map(filter => (<MenuItem value={filter} key={filter}>{filter}</MenuItem>))}
      </SelectBox>
    </Stack>
  );
}
