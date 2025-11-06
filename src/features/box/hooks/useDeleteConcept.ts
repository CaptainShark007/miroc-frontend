import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteConcept } from '@features/box/api/service';

export const useDeleteConcept = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteConcept(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['concepts'] });
    },
  });
};
