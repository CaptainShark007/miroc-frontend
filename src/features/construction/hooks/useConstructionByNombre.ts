import { useQuery } from '@tanstack/react-query';
import { getConstructionByNombre } from '@features/construction/api/service';
import { GetConstructionResponse } from '@features/construction/types';

export const useConstructionByNombre = (nombre: string | undefined) => {
  return useQuery<GetConstructionResponse>({
    queryKey: ['construction', nombre],
    queryFn: () => getConstructionByNombre(nombre!),
    enabled: !!nombre,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
