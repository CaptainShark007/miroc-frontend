import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '@features/employee/types';
import { useToast } from '@shared/hooks/useToast';
import { useDeleteEmployee } from './useDeleteEmployee';

interface UseEmployeeActionsReturn {
  deleteDialog: {
    open: boolean;
    employee: Employee | null;
  };
  handleEdit: (employee: Employee) => void;
  handleDelete: (employee: Employee) => void;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
  isDeleting: boolean;
}

export const useEmployeeActions = (): UseEmployeeActionsReturn => {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    employee: Employee | null;
  }>({ open: false, employee: null });

  const { showToast } = useToast();
  const navigate = useNavigate();
  const deleteEmployeeMutation = useDeleteEmployee();

  const handleEdit = (employee: Employee) => {
    if (!employee.dni) {
      showToast('Error: DNI de empleado no válido', 'error');
      return;
    }

    navigate(`/entities/employees/edit/${employee.dni}`);
  };

  const handleDelete = (employee: Employee) => {
    setDeleteDialog({ open: true, employee });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.employee) {
      deleteEmployeeMutation.mutate(deleteDialog.employee.dni, {
        onSuccess: () => {
          setDeleteDialog({ open: false, employee: null });
        },
        onError: () => {
          setDeleteDialog({ open: false, employee: null });
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, employee: null });
  };

  return {
    deleteDialog,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    isDeleting: deleteEmployeeMutation.isPending,
  };
};
