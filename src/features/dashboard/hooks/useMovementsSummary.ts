import { useQuery } from '@tanstack/react-query';
import axios from '@app/axios';
import type { GetMovementsSummaryResponse } from '@features/box/types';

const getMovementsSummary = async (): Promise<GetMovementsSummaryResponse> => {
  const response = await axios.get<GetMovementsSummaryResponse>(
    '/api/v1/movements/summary'
  );
  return response;
};

export const useMovementsSummary = () => {
  return useQuery({
    queryKey: ['movementsSummary'],
    queryFn: getMovementsSummary,
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
};
