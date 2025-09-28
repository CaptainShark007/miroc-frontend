import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProvider } from '@/features/provider/api/service';
import { UpdateProviderRequest, UpdateProviderResponse } from '@/features/provider/types';
import { useToast } from '@/shared/hooks/useToast';

export const useUpdateProvider = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    UpdateProviderResponse,
    Error,
    { providerCuit: number; data: UpdateProviderRequest }
  >({
    mutationFn: ({ providerCuit, data }) => updateProvider(providerCuit, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      showToast(
        `Proveedor ${data.data.firstName} actualizado exitosamente`,
        'success'
      );
    },
    onError: (error) => {
      showToast(`Error al actualizar proveedor: ${error.message}`, 'error');
    },
  });
};
