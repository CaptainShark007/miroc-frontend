import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from '@/features/provider/types';
import { useToast } from '@/shared/hooks/useToast';
import { useDeleteProvider } from './useDeleteProvider';

interface UseProviderActionsReturn {
  deleteDialog: {
    open: boolean;
    provider: Provider | null;
  };
  permissionsDialog: {
    open: boolean;
  };
  handleEdit: (provider: Provider) => void;
  handleDelete: (provider: Provider) => void;
  handleManagePermissions: () => void;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  handleClosePermissions: () => void;
  isDeleting: boolean;
}

export const useProviderActions = (): UseProviderActionsReturn => {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    provider: Provider | null;
  }>({ open: false, provider: null });

  const [permissionsDialog, setPermissionsDialog] = useState<{
    open: boolean;
  }>({ open: false });

  const { showToast } = useToast();
  const navigate = useNavigate();
  const deleteProviderMutation = useDeleteProvider();

  const handleEdit = (provider: Provider) => {
    if (!provider.cuit) {
      showToast('Error: CUIT de proveedor no válido', 'error');
      return;
    }
    navigate(`/entities/suppliers/edit/${provider.cuit}`);
  };

  const handleDelete = (provider: Provider) => {
    setDeleteDialog({ open: true, provider });
  };

  const handleManagePermissions = () => {
    setPermissionsDialog({ open: true });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.provider) {
      deleteProviderMutation.mutate(deleteDialog.provider.cuit.toString(), {
        onSuccess: () => {
          setDeleteDialog({ open: false, provider: null });
        },
        onError: () => {
          setDeleteDialog({ open: false, provider: null });
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, provider: null });
  };

  const handleClosePermissions = () => {
    setPermissionsDialog({ open: false });
  };

  return {
    deleteDialog,
    permissionsDialog,
    handleEdit,
    handleDelete,
    handleManagePermissions,
    handleConfirmDelete,
    handleCancelDelete,
    handleClosePermissions,
    isDeleting: deleteProviderMutation.isPending,
  };
};
