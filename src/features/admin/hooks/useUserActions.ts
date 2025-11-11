import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@features/admin/types';
import { useToast } from '@shared/hooks/useToast';
import { useDeleteUser } from './useDeleteUser';

interface UseUserActionsReturn {
  deleteDialog: {
    open: boolean;
    user: User | null;
  };
  permissionsDialog: {
    open: boolean;
  };
  handleEdit: (user: User) => void;
  handleDelete: (user: User) => void;
  handleManagePermissions: () => void;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  handleClosePermissions: () => void;
  isDeleting: boolean;
}

export const useUserActions = (): UseUserActionsReturn => {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    user: User | null;
  }>({ open: false, user: null });

  const [permissionsDialog, setPermissionsDialog] = useState<{
    open: boolean;
  }>({ open: false });

  const { showToast } = useToast();
  const navigate = useNavigate();
  const deleteUserMutation = useDeleteUser();

  const handleEdit = (user: User) => {
    if (user.dni === null || user.dni === undefined) {
      showToast('Error: DNI de usuario no válido', 'error');
      return;
    }

    navigate(`/admin/users/edit/${user.dni}`);
  };

  const handleDelete = (user: User) => {
    setDeleteDialog({ open: true, user });
  };

  const handleManagePermissions = () => {
    setPermissionsDialog({ open: true });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.user) {
      deleteUserMutation.mutate(deleteDialog.user.dni, {
        onSuccess: () => {
          setDeleteDialog({ open: false, user: null });
        },
        onError: () => {
          setDeleteDialog({ open: false, user: null });
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, user: null });
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
    isDeleting: deleteUserMutation.isPending,
  };
};
