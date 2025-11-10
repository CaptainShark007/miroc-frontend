import { useQuery } from '@tanstack/react-query';
import { getClientByDni } from '@features/client/api/service';
import { GetClientResponse } from '@features/client/types/clientTypes';

export const useClientByDni = (dni: number | undefined) => {
  return useQuery<GetClientResponse>({
    queryKey: ['client', dni],
    queryFn: () => getClientByDni(dni!),
    enabled: !!dni,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
