import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client } from '@features/client/types/clientTypes';
import { useToast } from '@shared/hooks/useToast';
import { useDeleteClient } from './useDeleteClient';

interface UseClientActionsReturn {
  deleteDialog: {
    open: boolean;
    client: Client | null;
  };
  handleEdit: (client: Client) => void;
  handleDelete: (client: Client) => void;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  isDeleting: boolean;
}

export const useClientActions = (): UseClientActionsReturn => {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    client: Client | null;
  }>({ open: false, client: null });

  const { showToast } = useToast();
  const navigate = useNavigate();
  const deleteClientMutation = useDeleteClient();

  const handleEdit = (client: Client) => {
    if (!client.dni) {
      showToast('Error: DNI de cliente no válido', 'error');
      return;
    }

    navigate(`/entities/clients/edit/${client.dni}`);
  };

  const handleDelete = (client: Client) => {
    setDeleteDialog({ open: true, client });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.client) {
      deleteClientMutation.mutate(
        {
          dni: deleteDialog.client.dni,
          permanent: false,
        },
        {
          onSuccess: () => {
            setDeleteDialog({ open: false, client: null });
          },
          onError: () => {
            setDeleteDialog({ open: false, client: null });
          },
        }
      );
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, client: null });
  };

  return {
    deleteDialog,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleting: deleteClientMutation.isPending,
  };
};
