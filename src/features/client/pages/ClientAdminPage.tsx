import React, { useState } from 'react';
import {
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientHeader from '../components/ClientHeader';
import { ClientTable } from '../components/ClientTable';
import { useClients } from '../hooks/useClients';
import { useDeleteClient } from '../hooks/useDeleteClient';
import { Client } from '../types/clientTypes';
import { useToast } from '@shared/hooks/useToast';
import { useDebounce } from '@shared/hooks/useDebounce';
import CustomPagination from '@shared/components/CustomPagination';
import ConfirmDialog from '@shared/components/ConfirmDialog';

const ClientAdminPage = () => {
  const navigate = useNavigate();
  const { showError } = useToast();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('first_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Queries
  const { data, isLoading, error } = useClients({
    pageIndex: page + 1,
    pageSize: rowsPerPage,
    q: debouncedSearch || undefined,
    sort: `${sortBy},${sortOrder}`,
  });
  
  const deleteMutation = useDeleteClient();

  // Mostrar error si existe
  React.useEffect(() => {
    if (error) {
      showError('Error al cargar los clientes');
    }
  }, [error, showError]);

  // Handlers
  const handleOpenCreateForm = () => {
    navigate('/entities/clients/create');
  };

  const handleOpenEditForm = (client: Client) => {
    navigate(`/entities/clients/edit/${client.dni}`);
  };

  const handleOpenDeleteDialog = (client: Client) => {
    setSelectedClient(client);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTimeout(() => {
      setSelectedClient(null);
    }, 200);
  };

  const handleConfirmDelete = () => {
    if (!selectedClient) return;

    deleteMutation.mutate(
      {
        dni: selectedClient.dni,
        permanent: false,
      },
      {
        onSuccess: () => {
          handleCloseDeleteDialog();
        },
        onError: () => {
          handleCloseDeleteDialog();
        },
      }
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(0);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setPage(0);
  };

  const clients = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 0;
  const totalItems = data?.data?.totalItems || 0;

  return (
    <Box sx={{ p: 3 }}>
      <ClientHeader
        onCreateClient={handleOpenCreateForm}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <Paper
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 220px)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <ClientTable
            clients={clients}
            isLoading={isLoading}
            onEdit={handleOpenEditForm}
            onDelete={handleOpenDeleteDialog}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        </Box>

        <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
          <CustomPagination
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>

      <ConfirmDialog
        open={deleteDialogOpen}
        title='Confirmar eliminación'
        message={
          selectedClient
            ? `¿Estás seguro de que deseas eliminar al cliente ${selectedClient.firstName} (DNI: ${selectedClient.dni})? Esta acción no se puede deshacer.`
            : ''
        }
        confirmText={deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
        cancelText='Cancelar'
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteDialog}
        severity='error'
      />
    </Box>
  );
};

export default ClientAdminPage;
