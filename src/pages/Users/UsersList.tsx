import { useState } from 'react';
import mushroom from '@/service/api/mushroom-api';
import type { MushroomError, Service } from '@/service/api/mushroom-api';
import Loading from '@/components/Loading/Loading';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
export default function UsersList() {
  const [loading, setLoading] = useState(true);
  const [dataTable, setDataTable] = useState<Service[]>([]);
  const paginationModel = { page: 0, pageSize: 10 };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', minWidth: 300 },
    { field: 'route', headerName: 'Route', minWidth: 400 },
  ];

  const getSessionAsync = async () => {
    try {
      const response = await mushroom.service.listAsync();
      console.log('Các service: %o', response);
      setDataTable(response.result);
    } catch (e) {
      const { message } = e as MushroomError;
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSessionAsync();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={dataTable}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
