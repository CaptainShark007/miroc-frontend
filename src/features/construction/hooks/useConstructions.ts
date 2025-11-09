import { useQuery } from '@tanstack/react-query';
import { getConstructions } from '@features/construction/api/service';
import {
  GetConstructionsRequest,
  GetConstructionsResponse,
} from '@features/construction/types';

export const useConstructions = (params: GetConstructionsRequest) => {
  return useQuery<GetConstructionsResponse>({
    queryKey: [
      'constructions',
      params.pageIndex,
      params.pageSize,
      params.q,
      params.fClientDni,
      params.sort,
    ],
    queryFn: () => getConstructions(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
