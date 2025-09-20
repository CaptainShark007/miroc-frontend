import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/features/admin/api/service';
import { UpdateUserRequest, UpdateUserResponse } from '@/features/admin/types';
import { useToast } from '@/shared/hooks/useToast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    UpdateUserResponse,
    Error,
    { userId: number; data: UpdateUserRequest }
  >({
    mutationFn: ({ userId, data }) => updateUser(userId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast(
        `Usuario ${data.data.firstName} ${data.data.lastName} actualizado exitosamente`,
        'success'
      );
    },
    onError: (error) => {
      showToast(`Error al actualizar usuario: ${error.message}`, 'error');
    },
  });
};
