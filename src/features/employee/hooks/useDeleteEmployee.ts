import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee } from '@features/employee/api/service';
import { DeleteEmployeeResponse } from '@features/employee/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<DeleteEmployeeResponse, ErrorResponse, number>({
    mutationFn: (dni: number) => deleteEmployee(dni),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      const employee = response.data;
      if (employee) {
        showToast(
          `Empleado ${employee.firstName} ${employee.lastName} eliminado exitosamente`,
          'success'
        );
      } else {
        showToast('Empleado eliminado exitosamente', 'success');
      }
    },
    onError: (error) => {
      showToast(
        `Error al eliminar empleado: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
