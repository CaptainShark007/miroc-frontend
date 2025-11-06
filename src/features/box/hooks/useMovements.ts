import { useQuery } from '@tanstack/react-query';
import { getMovements } from '@features/box/api/service';
import { GetMovementsRequest, GetMovementsResponse } from '@features/box/types';

export const useMovements = (params: GetMovementsRequest) => {
  return useQuery<GetMovementsResponse>({
    queryKey: [
      'movements',
      params.pageIndex,
      params.pageSize,
      params.q,
      params.fDateFrom,
      params.fDateTo,
      params.fPaymentMethod,
      params.fCode,
      params.sort,
    ],
    queryFn: () => getMovements(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
