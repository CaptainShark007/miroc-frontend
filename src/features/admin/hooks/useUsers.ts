import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/features/admin/api/service';
import { GetUsersRequest } from '@/features/admin/types';

export const useUsers = (params: GetUsersRequest) => {
  return useQuery({
    queryKey: ['users', params.pageIndex, params.pageSize],
    queryFn: () => getUsers(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
