import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createConcept } from '@features/box/api/service';
import { CreateConceptRequest } from '@features/box/types';

export const useCreateConcept = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConceptRequest) => createConcept(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concepts'] });
    },
  });
};
