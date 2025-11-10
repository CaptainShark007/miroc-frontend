import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useToast } from '@shared/hooks/useToast';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useMovements } from '@features/box/hooks/useMovements';
import { useMovementActions } from '@features/box/hooks/useMovementActions';
import { Movement } from '@features/box/types';
import CustomPagination from '@shared/components/CustomPagination';
import ConfirmDialog from '@shared/components/ConfirmDialog';
import MovementsHeader from '@features/box/components/MovementsHeader';
import MovementsTable from '@features/box/components/MovementsTable';
import ConceptManagementModal from '@features/box/components/ConceptManagementModal';
import MovementDetailDialog from '@features/box/components/MovementDetailDialog';
import MovementsSummaryCards from '@features/box/components/MovementsSummaryCards';

export default function MovementPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [conceptModalOpen, setConceptModalOpen] = useState(false);
  const [detailDialog, setDetailDialog] = useState<{
    open: boolean;
    movement: Movement | null;
  }>({
    open: false,
    movement: null,
  });

  const { showToast } = useToast();
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(searchQuery, 500);
  const debouncedDateFrom = useDebounce(dateFrom, 500);
  const debouncedDateTo = useDebounce(dateTo, 500);

  const { data, isLoading, error } = useMovements({
    pageIndex: page + 1,
    pageSize: rowsPerPage,
    q: debouncedSearch || undefined,
    fDateFrom: debouncedDateFrom || undefined,
    fDateTo: debouncedDateTo || undefined,
    sort: `${sortBy}:${sortOrder}`,
  });

  const {
    deleteDialog,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleting,
  } = useMovementActions();

  React.useEffect(() => {
    if (error) {
      showToast('Error al cargar los movimientos', 'error');
    }
  }, [error, showToast]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleCreateMovement = () => {
    navigate('/movements/create');
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

  const handleDateFromChange = (value: string) => {
    setDateFrom(value);
    setPage(0);
  };

  const handleDateToChange = (value: string) => {
    setDateTo(value);
    setPage(0);
  };

  const handleManageConcepts = () => {
    setConceptModalOpen(true);
  };

  const handleCloseConceptModal = () => {
    setConceptModalOpen(false);
  };

  const handleViewDetail = (movement: Movement) => {
    setDetailDialog({ open: true, movement });
  };

  const handleCloseDetail = () => {
    setDetailDialog({ open: false, movement: null });
  };

  const movements = data?.data?.items || [];
  const totalItems = data?.data?.totalItems || 0;
  const totalPages = data?.data?.totalPages || 0;

  return (
    <Box sx={{ p: 3 }}>
      <MovementsHeader
        onCreateMovement={handleCreateMovement}
        onManageConcepts={handleManageConcepts}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
      />

      <MovementsSummaryCards />

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
          <MovementsTable
            movements={movements}
            isLoading={isLoading}
            onView={handleViewDetail}
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
          deleteDialog.movement
            ? `¿Estás seguro de que deseas eliminar el movimiento #${deleteDialog.movement.codeMovement}? Esta acción no se puede deshacer.`
            : ''
        }
        confirmText={isDeleting ? 'Eliminando...' : 'Eliminar'}
        cancelText='Cancelar'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        severity='error'
      />

      <ConceptManagementModal
        open={conceptModalOpen}
        onClose={handleCloseConceptModal}
      />

      <MovementDetailDialog
        open={detailDialog.open}
        onClose={handleCloseDetail}
        movement={detailDialog.movement}
      />
    </Box>
  );
}
