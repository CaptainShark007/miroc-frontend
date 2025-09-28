import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProvider } from '@/features/provider/api/service';
import { DeleteProviderResponse } from '@/features/provider/types';
import { useToast } from '@/shared/hooks/useToast';

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<DeleteProviderResponse, Error, string>({
    mutationFn: (providerCuit: string) => deleteProvider(Number(providerCuit)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      showToast(
        `Proveedor ${data.data.firstName} eliminado exitosamente`,
        'success'
      );
    },
    onError: (error) => {
      showToast(`Error al eliminar proveedor: ${error.message}`, 'error');
    },
  });
};