import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMovement } from '@features/box/api/service';
import { DeleteMovementResponse } from '@features/box/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useDeleteMovement = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<DeleteMovementResponse, ErrorResponse, number>({
    mutationFn: (code: number) => deleteMovement(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movements'] });
      showToast('Movimiento eliminado exitosamente', 'success');
    },
    onError: (error) => {
      showToast(
        `Error al eliminar movimiento: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
