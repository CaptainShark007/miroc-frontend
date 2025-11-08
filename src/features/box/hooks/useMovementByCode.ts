import { useQuery } from '@tanstack/react-query';
import { getMovementByCode } from '@features/box/api/service';
import { GetMovementResponse } from '@features/box/types';

export const useMovementByCode = (code: string | undefined) => {
  const codeNumber = code ? parseInt(code, 10) : undefined;

  return useQuery<GetMovementResponse>({
    queryKey: ['movement', codeNumber],
    queryFn: () => getMovementByCode(codeNumber!),
    enabled: !!codeNumber && !isNaN(codeNumber),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
