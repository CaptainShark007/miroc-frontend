import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '@/features/admin/api/service';
import { CreateUserRequest, CreateUserResponse } from '@/features/admin/types';
import { useToast } from '@/shared/hooks/useToast';

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<CreateUserResponse, Error, CreateUserRequest>({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showToast(
        `Usuario ${data.data.firstName} ${data.data.lastName} creado exitosamente`,
        'success'
      );
    },
    onError: (error) => {
      showToast(`Error al crear usuario: ${error.message}`, 'error');
    },
  });
};
