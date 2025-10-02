import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProvider } from "@/features/provider/api/service";
import { CreateProviderRequest, CreateProviderResponse } from "@/features/provider/types";
import { useToast } from "@/shared/hooks/useToast";

export const useCreateProvider = () => {

    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation<CreateProviderResponse, Error, CreateProviderRequest>({
        mutationFn: createProvider,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['providers'] });
            showToast(
                `Proveedor ${data.data.firstName} creado exitosamente`,
                'success'
            );
        },
        onError: (error) => {
            showToast(`Error al crear proveedor: ${error.message}`, 'error');
        },
    });

}

