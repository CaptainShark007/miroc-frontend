import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMovement } from '@features/box/api/service';
import {
  CreateMovementRequest,
  CreateMovementResponse,
} from '@features/box/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useCreateMovement = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    CreateMovementResponse,
    ErrorResponse,
    CreateMovementRequest
  >({
    mutationFn: createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movements'] });
      showToast('Movimiento creado exitosamente', 'success');
    },
    onError: (error) => {
      showToast(
        `Error al crear movimiento: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
