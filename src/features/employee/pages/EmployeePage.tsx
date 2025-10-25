import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useToast } from '@shared/hooks/useToast';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useEmployees } from '@features/employee/hooks/useEmployees';
import { useEmployeeActions } from '@features/employee/hooks/useEmployeeActions';
import CustomPagination from '@shared/components/CustomPagination';
import ConfirmDialog from '@shared/components/ConfirmDialog';
import EmployeesHeader from '@features/employee/components/EmployeesHeader';
import EmployeesTable from '@features/employee/components/EmployeesTable';

export default function EmployeePage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('first_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { showToast } = useToast();
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading, error } = useEmployees({
    pageIndex: page + 1,
    pageSize: rowsPerPage,
    q: debouncedSearch || undefined,
    sort: `${sortBy},${sortOrder}`,
  });

  const {
    deleteDialog,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleting,
  } = useEmployeeActions();

  React.useEffect(() => {
    if (error) {
      showToast('Error al cargar los empleados', 'error');
    }
  }, [error, showToast]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleCreateEmployee = () => {
    navigate('/entities/employees/create');
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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(0);
  };

  const employees = data?.data?.items || [];
  const totalItems = data?.data?.totalItems || 0;
  const totalPages = data?.data?.totalPages || 0;

  return (
    <Box sx={{ p: 3 }}>
      <EmployeesHeader
        onCreateEmployee={handleCreateEmployee}
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
          <EmployeesTable
            employees={employees}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>

      <ConfirmDialog
        open={deleteDialog.open}
        title='Confirmar eliminación'
        message={
          deleteDialog.employee
            ? `¿Estás seguro de que deseas eliminar al empleado ${deleteDialog.employee.firstName} ${deleteDialog.employee.lastName}? Esta acción no se puede deshacer.`
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
