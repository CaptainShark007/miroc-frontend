import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateConcept } from '@features/box/api/service';
import { UpdateConceptRequest } from '@features/box/types';

interface UpdateConceptParams {
  id: number;
  data: UpdateConceptRequest;
}

export const useUpdateConcept = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateConceptParams) => updateConcept(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concepts'] });
    },
  });
};
