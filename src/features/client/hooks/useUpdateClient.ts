import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClient } from '@features/client/api/service';
import { UpdateClientResponse } from '@features/client/types/clientTypes';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';
import { JsonPatchOp } from '@shared/types/json';

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    UpdateClientResponse,
    ErrorResponse,
    { dni: number; ops: JsonPatchOp[] }
  >({
    mutationFn: ({ dni, ops }) => updateClient(dni, ops),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client', variables.dni] });
      const client = response.data;
      if (client) {
        showToast(
          `Cliente ${client.firstName} actualizado exitosamente`,
          'success'
        );
      } else {
        showToast('Cliente actualizado exitosamente', 'success');
      }
    },
    onError: (error) => {
      showToast(
        `Error al actualizar cliente: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
