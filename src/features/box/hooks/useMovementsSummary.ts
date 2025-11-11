import { useQuery } from '@tanstack/react-query';
import { getMovementsSummary } from '@features/box/api/service';
import { GetMovementsSummaryResponse } from '@features/box/types';

export const useMovementsSummary = () => {
  return useQuery<GetMovementsSummaryResponse>({
    queryKey: ['movements-summary'],
    queryFn: getMovementsSummary,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
