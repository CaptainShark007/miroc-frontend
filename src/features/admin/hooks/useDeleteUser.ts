import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/features/admin/api/service';
import { DeleteUserResponse } from '@/features/admin/types';
import { useToast } from '@/shared/hooks/useToast';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<DeleteUserResponse, Error, string>({
    mutationFn: (userId: string) => deleteUser(Number(userId)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast(
        `Usuario ${data.data.firstName} ${data.data.lastName} eliminado exitosamente`,
        'success'
      );
    },
    onError: (error) => {
      showToast(`Error al eliminar usuario: ${error.message}`, 'error');
    },
  });
};
