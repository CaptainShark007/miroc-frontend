import { useQuery } from '@tanstack/react-query';
import axios from '@app/axios';
import type { GetMovementsResponse } from '@features/box/types';

const getRecentMovements = async (): Promise<GetMovementsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.set('pageIndex', '1');
  queryParams.set('pageSize', '10');
  queryParams.set('sort', 'date,desc');

  const response = await axios.get<GetMovementsResponse>(
    `/api/v1/movements?${queryParams.toString()}`
  );
  return response;
};

export const useRecentMovements = () => {
  return useQuery({
    queryKey: ['recentMovements'],
    queryFn: getRecentMovements,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    placeholderData: (previousData) => previousData,
  });
};
