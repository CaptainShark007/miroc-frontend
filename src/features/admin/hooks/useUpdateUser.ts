import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@features/admin/api/service';
import { UpdateUserResponse } from '@features/admin/types';
import { useToast } from '@shared/hooks/useToast';
import { ErrorResponse } from '@shared/types/errorResponse';
import { JsonPatchOp } from '@shared/types/json';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    UpdateUserResponse,
    ErrorResponse,
    { dni: number; ops: JsonPatchOp[] }
  >({
    mutationFn: ({ dni, ops }) => updateUser(dni, ops),
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
