import { useQuery } from '@tanstack/react-query';
import { getConstructionByNombre } from '@features/construction/api/service';
import { GetConstructionResponse } from '@features/construction/types';

export const useConstructionByNombre = (nombre: string | undefined) => {
  const nombreStr = nombre ? String(nombre) : undefined;
  return useQuery<GetConstructionResponse>({
    queryKey: ['construction', nombreStr],
    queryFn: () => getConstructionByNombre(nombreStr!),
    enabled: !!nombreStr,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
