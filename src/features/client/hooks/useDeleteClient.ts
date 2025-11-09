import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteClient } from '@features/client/api/service';
import { DeleteClientResponse } from '@features/client/types/clientTypes';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<DeleteClientResponse, ErrorResponse, { dni: number; permanent?: boolean }>({
    mutationFn: ({ dni, permanent }) => deleteClient(dni, permanent),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      const client = response.data;
      if (client) {
        showToast(
          `Cliente ${client.firstName} eliminado exitosamente`,
          'success'
        );
      } else {
        showToast('Cliente eliminado exitosamente', 'success');
      }
    },
    onError: (error) => {
      showToast(
        `Error al eliminar cliente: ${error.error?.message || 'Error desconocido'}`,
        'error'
      );
    },
  });
};
