import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Construction } from '@features/construction/types';
import { useToast } from '@shared/hooks/useToast';
import { useDeleteConstruction } from './useDeleteConstruction';

interface UseConstructionActionsReturn {
  deleteDialog: {
    open: boolean;
    construction: Construction | null;
  };
  handleEdit: (construction: Construction) => void;
  handleDelete: (construction: Construction) => void;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  isDeleting: boolean;
}

export const useConstructionActions = (): UseConstructionActionsReturn => {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    construction: Construction | null;
  }>({ open: false, construction: null });

  const { showToast } = useToast();
  const navigate = useNavigate();
  const deleteConstructionMutation = useDeleteConstruction();

  const handleEdit = (construction: Construction) => {
    if (!construction.name) {
      showToast('Error: Nombre de obra no válido', 'error');
      return;
    }
    navigate(`/works/edit/${encodeURIComponent(construction.name)}`);
  };

  const handleDelete = (construction: Construction) => {
    setDeleteDialog({ open: true, construction });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.construction) {
      deleteConstructionMutation.mutate(deleteDialog.construction.name, {
        onSuccess: () => {
          setDeleteDialog({ open: false, construction: null });
        },
        onError: () => {
          setDeleteDialog({ open: false, construction: null });
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, construction: null });
  };

  return {
    deleteDialog,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleting: deleteConstructionMutation.isPending,
  };
};
