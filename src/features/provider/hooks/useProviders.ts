import { useQuery } from "@tanstack/react-query";
import { getProviders } from "@/features/provider/api/service";
import { GetProviderRequest } from "@/features/provider/types";

export const useProviders = (params: GetProviderRequest) => {
    return useQuery({
        queryKey: [
            'providers',
            params.pageIndex,
            params.pageSize,
            params.q,
            params.fCuit,
            params.fFirstName,
            params.fAddress,
            params.sort,
        ],
        queryFn: () => getProviders(params),
        staleTime: 0,
    });
}
