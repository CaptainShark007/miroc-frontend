import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useToast } from '@shared/hooks/useToast';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useConstructions } from '@features/construction/hooks/useConstructions';
import { useConstructionActions } from '@features/construction/hooks/useConstructionActions';
import CustomPagination from '@shared/components/CustomPagination';
import ConfirmDialog from '@shared/components/ConfirmDialog';
import ConstructionHeader from '@features/construction/components/ConstructionHeader';
import ConstructionTable from '@features/construction/components/ConstructionTable';

export default function ConstructionPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { showToast } = useToast();
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading, error } = useConstructions({
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
  } = useConstructionActions();

  React.useEffect(() => {
    if (error) {
      showToast('Error al cargar las obras', 'error');
    }
  }, [error, showToast]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleCreateConstruction = () => {
    navigate('/works/create');
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

  const constructions = data?.data?.items || [];
  const totalItems = data?.data?.totalItems || 0;
  const totalPages = data?.data?.totalPages || 0;

  return (
    <Box sx={{ p: 3 }}>
      <ConstructionHeader
        onCreateConstruction={handleCreateConstruction}
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
          <ConstructionTable
            constructions={constructions}
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
          deleteDialog.construction
            ? `¿Estás seguro de que deseas eliminar la obra "${deleteDialog.construction.name}"? Esta acción no se puede deshacer.`
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
