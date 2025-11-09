import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createConcept } from '@features/box/api/service';
import { CreateConceptRequest, CreateConceptResponse } from '@features/box/types';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useCreateConcept = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateConceptResponse,
    ErrorResponse,
    CreateConceptRequest
  >({
    mutationFn: (data: CreateConceptRequest) => createConcept(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concepts'] });
    },
  });
};
