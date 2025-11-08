import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteConstruction } from '@features/construction/api/service';
import { DeleteConstructionResponse } from '@features/construction/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

interface DeleteConstructionParams {
  name: string;
  clientDni: number;
}

export const useDeleteConstruction = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<DeleteConstructionResponse, ErrorResponse, DeleteConstructionParams>({
    mutationFn: ({ name, clientDni }: DeleteConstructionParams) => 
      deleteConstruction(name, clientDni),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['constructions'] });
      showToast('Obra eliminada exitosamente', 'success');
    },
    onError: (error) => {
      showToast(
        `Error al eliminar obra: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
