import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@features/admin/api/service';
import { UpdateUserRequest, UpdateUserResponse } from '@features/admin/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    UpdateUserResponse,
    ErrorResponse,
    { userId: number; data: UpdateUserRequest }
  >({
    mutationFn: ({ userId, data }) => updateUser(userId, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast(
        `Usuario ${res.data.firstName} ${res.data.lastName} actualizado exitosamente`,
        'success'
      );
    },
    onError: (res) => {
      showToast(`Error al actualizar usuario: ${res.error.message}`, 'error');
    },
  });
};
