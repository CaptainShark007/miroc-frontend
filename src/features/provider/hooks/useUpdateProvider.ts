import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProvider } from '@/features/provider/api/service';
import { UpdateProviderRequest, UpdateProviderResponse } from '@/features/provider/types';

export const useUpdateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateProviderResponse,
    Error,
    { providerCuit: number; data: UpdateProviderRequest }
  >({
    mutationFn: ({ providerCuit, data }) => updateProvider(providerCuit, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['providers'] });
      await queryClient.refetchQueries({ queryKey: ['providers'] });
    },
  });
};
