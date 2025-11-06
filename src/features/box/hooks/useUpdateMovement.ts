import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMovement } from '@features/box/api/service';
import {
  UpdateMovementResponse,
  CreateMovementRequest,
} from '@features/box/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useUpdateMovement = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    UpdateMovementResponse,
    ErrorResponse,
    { code: number; data: CreateMovementRequest }
  >({
    mutationFn: ({ code, data }) => updateMovement(code, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['movements'] });
      queryClient.invalidateQueries({ queryKey: ['movement', variables.code] });
      const movement = response.data;
      if (movement) {
        showToast('Movimiento actualizado exitosamente', 'success');
      } else {
        showToast('Movimiento actualizado exitosamente', 'success');
      }
    },
    onError: (error) => {
      showToast(
        `Error al actualizar movimiento: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
