import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRole } from '@features/admin/api/service';
import { UpdateRoleRequest, UpdateRoleResponse } from '@features/admin/types';
import { useToast } from '@shared/hooks/useToast';

interface UpdateRoleParams {
  roleName: string;
  data: UpdateRoleRequest;
}

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<UpdateRoleResponse, Error, UpdateRoleParams>({
    mutationFn: ({ roleName, data }) => updateRole(roleName, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      showToast(
        response.message || 'Permisos actualizados correctamente',
        'success'
      );
    },
    onError: () => {
      showToast('Error al actualizar los permisos del rol', 'error');
    },
  });
};
