import { useQuery } from '@tanstack/react-query';
import { getRoles } from '@features/admin/api/service';
import { RolesResponse } from '@features/admin/types';

export const useRoles = (enabled: boolean) => {
  return useQuery<RolesResponse>({
    queryKey: ['roles'],
    queryFn: getRoles,
    staleTime: 5 * 60 * 1000,
    enabled,
  });
};
