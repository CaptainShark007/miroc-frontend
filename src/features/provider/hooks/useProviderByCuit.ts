import { useQuery } from '@tanstack/react-query';
import { getProviderByCuit } from '@features/provider/api/service';
import { GetProviderResponse, Provider } from '@features/provider/types';

export const useProviderByCuit = (cuit: number | undefined) => {
  const { data, isLoading, error } = useQuery<GetProviderResponse>({
    queryKey: ['provider', cuit],
    queryFn: () => getProviderByCuit(cuit!),
    enabled: !!cuit,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    provider: data?.data as Provider | undefined,
    isLoading,
    error,
  };
};
