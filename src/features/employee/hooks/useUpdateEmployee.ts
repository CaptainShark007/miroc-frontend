import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmployee } from '@features/employee/api/service';
import { UpdateEmployeeResponse } from '@features/employee/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';
import { JsonPatchOp } from '@shared/types/json';

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    UpdateEmployeeResponse,
    ErrorResponse,
    { dni: number; ops: JsonPatchOp[] }
  >({
    mutationFn: ({ dni, ops }) => updateEmployee(dni, ops),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['employee', variables.dni] });
      const employee = response.data;
      if (employee) {
        showToast(
          `Empleado ${employee.firstName} ${employee.lastName} actualizado exitosamente`,
          'success'
        );
      } else {
        showToast('Empleado actualizado exitosamente', 'success');
      }
    },
    onError: (error) => {
      showToast(
        `Error al actualizar empleado: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
