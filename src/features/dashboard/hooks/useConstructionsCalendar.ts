import { useQuery } from '@tanstack/react-query';
import axios from '@app/axios';
import type { GetConstructionsResponse } from '@features/construction/types';

const getConstructionsCalendar = async (): Promise<GetConstructionsResponse> => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const queryParams = new URLSearchParams();
  queryParams.set('pageIndex', '1');
  queryParams.set('pageSize', '10');
  queryParams.set('fStartDate', formatDate(firstDay));
  queryParams.set('sort', 'startDate,asc');

  const response = await axios.get<GetConstructionsResponse>(
    `/api/v1/constructions?${queryParams.toString()}`
  );
  return response;
};

export const useConstructionsCalendar = () => {
  return useQuery({
    queryKey: ['constructionsCalendar'],
    queryFn: getConstructionsCalendar,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
};
