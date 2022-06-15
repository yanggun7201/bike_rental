import React, { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Rating } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useRecoilValue } from "recoil";
import { filteredBikesState } from "../../stores/bikes";
import { SearchAction } from "./components/SearchAction";
import { Filters } from "./components/Filters";

const columns: GridColDef[] = [
  {
    field: 'model',
    headerName: 'Model',
    width: 150,
    renderCell: (params: GridRenderCellParams): ReactNode => (
      <Link
        to={`/bikes/${params.id}`}
        color={"inherit"}
        underline={"hover"}
        component={RouterLink}
      >
        {params.value}
      </Link>
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

interface Props {
  loading: boolean,
  onSearch: () => void;
}

export const BikesPage: React.FC<Props> = ({
  loading = false,
  onSearch,
}) => {

  const filteredBikes = useRecoilValue(filteredBikesState);

  return (
    <>
      <SearchAction onSearch={onSearch} loading={loading} />
      <Filters />

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
