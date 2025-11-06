import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createConstruction } from '@features/construction/api/service';
import {
  CreateConstructionRequest,
  CreateConstructionResponse,
} from '@features/construction/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useCreateConstruction = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    CreateConstructionResponse,
    ErrorResponse,
    CreateConstructionRequest
  >({
    mutationFn: createConstruction,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['constructions'] });
      const construction = response.data;
      if (construction) {
        showToast(`Obra "${construction.name}" creada exitosamente`, 'success');
      } else {
        showToast('Obra creada exitosamente', 'success');
      }
    },
    onError: (error) => {
      showToast(`${error.error?.message || 'Error desconocido'}`, 'error');
    },
  });
};
