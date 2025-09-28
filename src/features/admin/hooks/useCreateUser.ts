import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '@features/admin/api/service';
import { CreateUserRequest, CreateUserResponse } from '@features/admin/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<CreateUserResponse, ErrorResponse, CreateUserRequest>({
    mutationFn: createUser,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast(
        `Usuario ${res.data.firstName} ${res.data.lastName} creado exitosamente`,
        'success'
      );
    },
    onError: (res) => {
      showToast(`Error al crear usuario: ${res.error.message}`, 'error');
    },
  });
};
