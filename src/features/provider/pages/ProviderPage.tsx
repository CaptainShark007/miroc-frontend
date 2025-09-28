/* import UnderConstruction from '@/shared/components/UnderConstruction';

export default function DashboardPage() {
  return (
    <UnderConstruction
      title='Proveedores'
      subtitle='El panel de proveedores estará disponible próximamente. Estamos trabajando en nuevas funcionalidades para mejorar tu experiencia.'
      size='large'
    />
  );
}
 */

import { Box, Paper } from '@mui/material';
import { useToast } from '@/shared/hooks/useToast';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ProvidersTable from '@/features/provider/components/ProvidersTable';
import CustomPagination from '@/shared/components/CustomPagination';
import { useProviders } from '@/features/provider/hooks/useProviders';
import ProviderHeader from '../components/ProviderHeader';
import { useProviderActions } from '@/features/provider/hooks/useProviderActions';
import ConfirmDialog from '@/shared/components/ConfirmDialog';

export default function ProviderPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading, error } = useProviders({
    pageIndex: page + 1,
    pageSize: rowsPerPage,
  });

  const {
    deleteDialog,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleting,
  } = useProviderActions();

  useEffect(() => {
    if (error) {
      showToast('Error al cargar los proveedores', 'error');
    }
  }, [error, showToast]);

  const handleChangePage = (newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleCreateProvider = () => {
    navigate('/entities/suppliers/create');
  };

  const providers = data?.data?.items || [];
  const totalItems = data?.data?.totalItems || 0;
  const totalPages = data?.data?.totalPages || 0;

  return (
    <Box sx={{ p: 3 }}>
      <ProviderHeader onCreateProvider={handleCreateProvider} />
      <Paper sx={{ borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <ProvidersTable
          providers={providers}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <CustomPagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ConfirmDialog
        open={deleteDialog.open}
        title='Confirmar eliminación'
        message={
          deleteDialog.provider
            ? `¿Estás seguro de que deseas eliminar al proveedor ${deleteDialog.provider.firstName}? Esta acción no se puede deshacer.`
            : ''
        }
        confirmText={isDeleting ? 'Eliminando...' : 'Eliminar'}
        cancelText='Cancelar'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        severity='error'
      />
    </Box>
  );
}
