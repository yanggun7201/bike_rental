import React, { ReactNode, useMemo } from "react";
import { Divider, MenuItem, Rating, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Bike, BikeFilters, DefaultBikeFilters } from "../../types/Bike";
import { PageTitle } from "../../components/PageTitle";
import { MuiLink } from "../../components/MuiLink";
import { SelectBox } from "../../components/SelectBox";
import useBikeFilter from "./hooks/useBikeFilter";
import { isEmpty } from "lodash";

const columns: GridColDef[] = [
  {
    field: 'model',
    headerName: 'Model',
    width: 150,
    renderCell: (params: GridRenderCellParams): ReactNode => (
      <MuiLink to={`/bikerental/bikes/${params.id}`} underline={"hover"}>{params.value}</MuiLink>
    ),
  },
  {
    field: 'color',
    headerName: 'Color',
    width: 150,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 300,
  },
  {
    field: 'ratingAverage',
    headerName: 'Rating Average',
    width: 160,
    renderCell: ({ value }: GridRenderCellParams): ReactNode => (
      <Rating name="disabled" value={value} readOnly />
    ),
  },
];

function isAvailableFilter(filter: string | number): boolean {
  return !isEmpty(filter) && filter !== "all";
}

function filter(bikes: Bike[], getValue: (bike: Bike) => string | number, filterValue: string | number): Bike[] {
  return bikes.filter(item => getValue(item) === filterValue);
}

interface Props {
  bikes: Bike[],
  loading: boolean,
  filters: BikeFilters,
}

export const BikesPage: React.FC<Props> = ({
  bikes = [],
  loading = false,
  filters = DefaultBikeFilters,
}) => {

  const {
    filters: modelFilters,
    selectedFilter: selectedModelFilter,
    handleChangeFilter: handleChangeModelFilter
  } = useBikeFilter<string[]>(filters?.models);

  const {
    filters: colorFilters,
    selectedFilter: selectedColorFilter,
    handleChangeFilter: handleChangeColorFilter
  } = useBikeFilter<string[]>(filters?.colors);

  const {
    filters: locationFilters,
    selectedFilter: selectedLocationFilter,
    handleChangeFilter: handleChangeLocationFilter
  } = useBikeFilter<string[]>(filters?.locations);

  const {
    filters: ratingFilters,
    selectedFilter: selectedRatingFilter,
    handleChangeFilter: handleChangeRatingFilter
  } = useBikeFilter<number[]>(filters?.ratings);

  const filteredBikes = useMemo(() => {
    let filtered = bikes;
    const modelFilter = selectedModelFilter.toLowerCase();
    const colorFilter = selectedColorFilter.toLowerCase();
    const locationFilter = selectedLocationFilter.toLowerCase();
    const ratingFilter = selectedRatingFilter.toLowerCase();

    if (isAvailableFilter(modelFilter)) {
      filtered = filter(filtered, item => item.model.toLowerCase(), modelFilter)
    }
    if (isAvailableFilter(colorFilter)) {
      filtered = filter(filtered, item => item.color.toLowerCase(), colorFilter)
    }
    if (isAvailableFilter(locationFilter)) {
      filtered = filter(filtered, item => item.location.toLowerCase(), locationFilter)
    }
    if (isAvailableFilter(ratingFilter)) {
      filtered = filter(filtered, item => item.ratingAverage, parseInt(ratingFilter))
    }

    return filtered;

  }, [
    bikes,
    selectedModelFilter,
    selectedLocationFilter,
    selectedColorFilter,
    selectedRatingFilter
  ]);

  return (
    <>
      <PageTitle>Bikes</PageTitle>

      <Stack
        alignItems={"center"}
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ mt: 2, mb: 2 }}
      >
        <SelectBox enableAll label="Model" value={selectedModelFilter} onChange={handleChangeModelFilter}>
          {modelFilters.map(filter => (<MenuItem value={filter} key={filter}>{filter}</MenuItem>))}
        </SelectBox>
        <SelectBox enableAll label="Color" value={selectedColorFilter} onChange={handleChangeColorFilter}>
          {colorFilters.map(filter => (<MenuItem value={filter} key={filter}>{filter}</MenuItem>))}
        </SelectBox>
        <SelectBox enableAll label="Location" value={selectedLocationFilter} onChange={handleChangeLocationFilter}>
          {locationFilters.map(filter => (<MenuItem value={filter} key={filter}>{filter}</MenuItem>))}
        </SelectBox>
        <SelectBox enableAll label="Rating Average" value={selectedRatingFilter} onChange={handleChangeRatingFilter}>
          {ratingFilters.map(filter => (<MenuItem value={filter} key={filter}>{filter}</MenuItem>))}
        </SelectBox>
      </Stack>

      <div style={{ height: 640, width: '100%' }}>
        <DataGrid
          rows={filteredBikes}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableColumnMenu
          disableSelectionOnClick
          loading={loading}
        />
      </div>
    </>
  );
}
