import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useToast } from '@/shared/hooks/useToast';
import { useUsers } from '@/features/admin/hooks/useUsers';
import { useUserActions } from '@/features/admin/hooks/useUserActions';
import CustomPagination from '@/shared/components/CustomPagination';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import UserAdminHeader from '@/features/admin/components/UserAdminHeader';
import UsersTable from '@/features/admin/components/UsersTable';

export default function UserAdminPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { data, isLoading, error } = useUsers({
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
  } = useUserActions();

  React.useEffect(() => {
    if (error) {
      showToast('Error al cargar los usuarios', 'error');
    }
  }, [error, showToast]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleCreateUser = () => {
    navigate('/admin/users/create');
  };

  const users = data?.data?.items || [];
  const totalItems = data?.data?.totalItems || 0;
  const totalPages = data?.data?.totalPages || 0;

  return (
    <Box sx={{ p: 3 }}>
      <UserAdminHeader onCreateUser={handleCreateUser} />

      <Paper
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <UsersTable
          users={users}
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
          deleteDialog.user
            ? `¿Estás seguro de que deseas eliminar al usuario ${deleteDialog.user.firstName} ${deleteDialog.user.lastName}? Esta acción no se puede deshacer.`
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
