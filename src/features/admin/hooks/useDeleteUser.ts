import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@features/admin/api/service';
import { DeleteUserResponse } from '@features/admin/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<DeleteUserResponse, ErrorResponse, number>({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast(
        `Usuario ${res.data.firstName} ${res.data.lastName} eliminado exitosamente`,
        'success'
      );
    },
    onError: (res) => {
      showToast(`Error al eliminar usuario: ${res.error.message}`, 'error');
    },
  });
};
