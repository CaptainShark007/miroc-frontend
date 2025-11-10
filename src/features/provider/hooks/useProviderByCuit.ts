import { useQuery } from '@tanstack/react-query';
import { getProviderByCuit } from '@features/provider/api/service';
import { GetProviderResponse } from '@features/provider/types';

export const useProviderByCuit = (cuit: number | undefined) => {
  return useQuery<GetProviderResponse>({
    queryKey: ['provider', cuit],
    queryFn: () => getProviderByCuit(cuit!),
    enabled: !!cuit,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
