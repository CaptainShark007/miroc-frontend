import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProvider } from "@/features/provider/api/service";
import { CreateProviderRequest, CreateProviderResponse } from "@/features/provider/types";

export const useCreateProvider = () => {

    const queryClient = useQueryClient();

    return useMutation<CreateProviderResponse, Error, CreateProviderRequest>({
        mutationFn: createProvider,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['providers'] });
        },
    });

}

