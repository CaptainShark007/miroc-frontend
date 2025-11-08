import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateConstruction } from '@features/construction/api/service';
import { UpdateConstructionResponse } from '@features/construction/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';
import { JsonPatchOp } from '@shared/types/json';

export const useUpdateConstruction = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    UpdateConstructionResponse,
    ErrorResponse,
    { name: string; ops: JsonPatchOp[] }
  >({
    mutationFn: ({ name, ops }) => updateConstruction(name, ops),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['constructions'] });
      queryClient.invalidateQueries({
        queryKey: ['construction', variables.name],
      });
      const construction = response.data;
      if (construction) {
        showToast(
          `Obra "${construction.name}" actualizada exitosamente`,
          'success'
        );
      } else {
        showToast('Obra actualizada exitosamente', 'success');
      }
    },
    onError: (error) => {
      showToast(
        `Error al actualizar obra: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
