import { useQuery } from '@tanstack/react-query';
import axios from '@app/axios';
import type { Client, PaginationData, ApiResponse } from '@features/client/types/clientTypes';

type GetClientsResponse = ApiResponse<PaginationData<Client>>;

const getClientsSummary = async (): Promise<GetClientsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.set('pageIndex', '1');
  queryParams.set('pageSize', '5');

  const response = await axios.get<GetClientsResponse>(
    `/api/v1/clients?${queryParams.toString()}`
  );
  return response;
};

export const useClientsSummary = () => {
  return useQuery({
    queryKey: ['clientsSummary'],
    queryFn: getClientsSummary,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
};
