import { atom, selector } from "recoil";
import { isEmpty } from "lodash";
import {
  Bike,
  BikeFilters,
  BikeSearchRanges,
  BikeSelectedFilters,
  DefaultBikeFilters,
  DefaultSelectedBikeFilters
} from "../types/Bike";

export const bikesState = atom({
  key: 'bikesState',
  default: [] as Bike[],
});

export const bikesFiltersState = atom({
  key: 'bikesFiltersState',
  default: DefaultBikeFilters as BikeFilters,
});

export const bikesSearchRangeState = atom({
  key: 'bikesSearchRangeState',
  default: { fromDate: new Date(), toDate: null } as BikeSearchRanges,
});

export const selectedBikesFiltersState = atom({
  key: 'selectedBikesFiltersState',
  default: DefaultSelectedBikeFilters as BikeSelectedFilters,
});

export const filteredBikesState = selector({
  key: 'filteredBikesState',
  get: ({ get }) => {
    const selectedBikesFilters = get(selectedBikesFiltersState);

    let filtered = get(bikesState);
    const modelFilter = selectedBikesFilters["model"].toLowerCase();
    const colorFilter = selectedBikesFilters["color"].toLowerCase();
    const locationFilter = selectedBikesFilters["location"].toLowerCase();
    const ratingFilter = selectedBikesFilters["rating"].toLowerCase();

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
  }
});

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
