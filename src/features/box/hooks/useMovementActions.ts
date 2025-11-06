import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movement } from '@features/box/types';
import { useToast } from '@shared/hooks/useToast';
import { useDeleteMovement } from './useDeleteMovement';

interface UseMovementActionsReturn {
  deleteDialog: {
    open: boolean;
    movement: Movement | null;
  };
  handleEdit: (movement: Movement) => void;
  handleDelete: (movement: Movement) => void;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  isDeleting: boolean;
}

export const useMovementActions = (): UseMovementActionsReturn => {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    movement: Movement | null;
  }>({ open: false, movement: null });

  const { showToast } = useToast();
  const navigate = useNavigate();
  const deleteMovementMutation = useDeleteMovement();

  const handleEdit = (movement: Movement) => {
    if (!movement.codeMovement) {
      showToast('Error: Código de movimiento no válido', 'error');
      return;
    }

    navigate(`/movements/edit/${movement.codeMovement}`);
  };

  const handleDelete = (movement: Movement) => {
    setDeleteDialog({ open: true, movement });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.movement) {
      deleteMovementMutation.mutate(deleteDialog.movement.codeMovement, {
        onSuccess: () => {
          setDeleteDialog({ open: false, movement: null });
        },
        onError: () => {
          setDeleteDialog({ open: false, movement: null });
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, movement: null });
  };

  return {
    deleteDialog,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleting: deleteMovementMutation.isPending,
  };
};
