import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployee } from '@features/employee/api/service';
import {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
} from '@features/employee/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    CreateEmployeeResponse,
    ErrorResponse,
    CreateEmployeeRequest
  >({
    mutationFn: createEmployee,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      const employee = response.data;
      if (employee) {
        showToast(
          `Empleado ${employee.firstName} ${employee.lastName} creado exitosamente`,
          'success'
        );
      } else {
        showToast('Empleado creado exitosamente', 'success');
      }
    },
    onError: (error) => {
      showToast(
        `Error al crear empleado: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
