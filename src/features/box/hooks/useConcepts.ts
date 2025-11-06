import { useQuery } from '@tanstack/react-query';
import { getConcepts } from '@features/box/api/service';
import { ConceptFilter } from '@features/box/types';

export const useConcepts = (filters?: ConceptFilter) => {
  return useQuery({
    queryKey: ['concepts', filters],
    queryFn: () => getConcepts(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
