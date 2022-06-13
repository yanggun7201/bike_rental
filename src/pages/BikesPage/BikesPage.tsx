import React, { ReactNode, useMemo } from "react";
import { isEmpty } from "lodash";
import { Divider, MenuItem, Rating, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { LoadingButton } from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';
import { Bike, BikeFilters, DefaultBikeFilters } from "../../types/Bike";
import { PageTitle } from "../../components/PageTitle";
import { MuiLink } from "../../components/MuiLink";
import { SelectBox } from "../../components/SelectBox";
import useBikeFilter from "./hooks/useBikeFilter";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

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

type FilterOperator = (value1: string | number, value2: string | number) => boolean;

const equalFilterOperator: FilterOperator = (value1, value2) => {
  return value1 === value2;
}

const equalOrGreaterFilterOperator: FilterOperator = (value1, value2) => {
  return value1 >= value2;
}

function filter(
  bikes: Bike[],
  getValue: (bike: Bike) => string | number,
  filterValue: string | number,
  filterOperator: FilterOperator,
): Bike[] {
  return bikes.filter(item => filterOperator(getValue(item), filterValue));
}

interface Props {
  bikes: Bike[],
  loading: boolean,
  filters: BikeFilters,
  onSearch: () => void;
  setFromDate: (date: Date | null) => void;
  setToDate: (date: Date | null) => void;
  fromDate: Date | null;
  toDate: Date | null;
}

export const BikesPage: React.FC<Props> = ({
  bikes = [],
  loading = false,
  filters = DefaultBikeFilters,
  onSearch,
  setFromDate,
  setToDate,
  fromDate,
  toDate,
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
      filtered = filter(filtered, item => item.model.toLowerCase(), modelFilter, equalFilterOperator)
    }
    if (isAvailableFilter(colorFilter)) {
      filtered = filter(filtered, item => item.color.toLowerCase(), colorFilter, equalFilterOperator)
    }
    if (isAvailableFilter(locationFilter)) {
      filtered = filter(filtered, item => item.location.toLowerCase(), locationFilter, equalFilterOperator)
    }
    if (isAvailableFilter(ratingFilter)) {
      filtered = filter(filtered, item => item.ratingAverage, parseInt(ratingFilter), equalOrGreaterFilterOperator)
    }

    return filtered;

  }, [bikes, selectedModelFilter, selectedLocationFilter, selectedColorFilter, selectedRatingFilter]);

  return (
    <>
      <PageTitle>Bikes</PageTitle>

      <Stack
        alignItems={"center"}
        direction={"row"}
        spacing={2}
        sx={{ mt: 2, mb: 2 }}
      >
        <Typography variant="h6" sx={{ minWidth: 70 }}>Search</Typography>
        <Divider orientation="vertical" flexItem />
        <DatePicker
          label="From"
          value={fromDate}
          onChange={setFromDate}
          minDate={new Date()}
          maxDate={toDate || undefined}
          disablePast
          InputProps={{
            readOnly: true,
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="To"
          value={toDate}
          onChange={setToDate}
          minDate={fromDate || new Date()}
          disablePast
          InputProps={{
            readOnly: true,
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <LoadingButton
          size="small"
          variant="contained"
          onClick={onSearch}
          loading={loading}
          loadingPosition="start"
          startIcon={<SendIcon />}
        >
          Search
        </LoadingButton>
      </Stack>

      <Stack
        alignItems={"center"}
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ mt: 3, mb: 3 }}
      >
        <Typography variant="h6" sx={{ minWidth: 70 }}>Filter</Typography>
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
