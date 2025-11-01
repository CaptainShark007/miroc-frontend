import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Pagination,
} from '@mui/material';
import ClientHeader from '../components/ClientHeader';
import { ClientTable } from '../components/ClientTable';
import { ClientForm } from '../components/ClientForm';
import { DeleteClientDialog } from '../components/DeleteClientDialog';
import { PatchClientDialog } from '../components/PatchClientDialog';
import {
  useClients,
  useCreateClient,
  useUpdateClient,
  usePatchClient,
  useDeleteClient,
} from '../hooks/useClients';
import { Client, CreateClientPayload, PatchOperation } from '../types/clientTypes';
import { useToast } from '@shared/hooks/useToast';
import { useDebounce } from '@shared/hooks/useDebounce';
import CustomPagination from '@shared/components/CustomPagination';

const ClientAdminPage = () => {
  const { showSuccess, showError } = useToast();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patchDialogOpen, setPatchDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Queries
  const { data, isLoading, error } = useClients(page + 1, rowsPerPage, debouncedSearch || undefined);
  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();
  const patchMutation = usePatchClient();
  const deleteMutation = useDeleteClient();

  // Handlers
  const handleOpenCreateForm = () => {
    setSelectedClient(null);
    setIsEditMode(false);
    setFormOpen(true);
  };

  const handleOpenEditForm = (client: Client) => {
    setSelectedClient(client);
    setIsEditMode(true);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedClient(null);
    setIsEditMode(false);
  };

  const handleOpenDeleteDialog = (client: Client) => {
    setSelectedClient(client);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedClient(null);
  };

  const handleOpenPatchDialog = (client: Client) => {
    setSelectedClient(client);
    setPatchDialogOpen(true);
  };

  const handleClosePatchDialog = () => {
    setPatchDialogOpen(false);
    setSelectedClient(null);
  };

  const handleSubmitForm = async (formData: CreateClientPayload) => {
    try {
      if (isEditMode && selectedClient) {
        await updateMutation.mutateAsync({
          dni: selectedClient.dni,
          payload: formData,
        });
        showSuccess('Cliente actualizado correctamente');
      } else {
        await createMutation.mutateAsync(formData);
        showSuccess('Cliente creado correctamente');
      }
      handleCloseForm();
    } catch (error: any) {
      showError(
        error?.message || 'Error al procesar la solicitud'
      );
    }
  };

  const handleDelete = (permanent: boolean) => {
    if (!selectedClient) return;

    deleteMutation.mutate(
      {
        dni: selectedClient.dni,
        permanent,
      },
      {
        onSuccess: () => {
          showSuccess(
            permanent
              ? 'Cliente eliminado permanentemente'
              : 'Cliente eliminado correctamente'
          );
          handleCloseDeleteDialog();
        },
        onError: (error: any) => {
          console.error('Error al eliminar:', error);
          const errorMessage = error?.response?.status === 404 
            ? 'El endpoint de eliminación no existe en el backend. Verifica que esté implementado DELETE /api/v1/clients/{dni}'
            : error?.message || 'Error al eliminar el cliente';
          showError(errorMessage);
          handleCloseDeleteDialog();
        },
      }
    );
  };

  const handlePatch = (operations: PatchOperation[]) => {
    if (!selectedClient) return;

    patchMutation.mutate(
      {
        dni: selectedClient.dni,
        operations,
      },
      {
        onSuccess: () => {
          showSuccess('Cliente actualizado correctamente');
          handleClosePatchDialog();
        },
        onError: (error: any) => {
          showError(error?.message || 'Error al actualizar el cliente');
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
          {/* Table */}
          <ClientTable
            clients={clients}
            isLoading={isLoading}
            error={error}
            onEdit={handleOpenEditForm}
            onDelete={handleOpenDeleteDialog}
          />
        </Box>

        {/* Pagination */}
        {totalPages > 0 && (
          <CustomPagination
            page={page}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>

      {/* Dialogs */}
      <ClientForm
        open={formOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        client={selectedClient}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteClientDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        client={selectedClient}
        isDeleting={deleteMutation.isPending}
      />

      <PatchClientDialog
        open={patchDialogOpen}
        onClose={handleClosePatchDialog}
        onSubmit={handlePatch}
        client={selectedClient}
        isSubmitting={patchMutation.isPending}
      />
    </Box>
  );
};

export default ClientAdminPage;
