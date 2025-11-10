import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getClients,
  createClient,
} from '../api/service';
import {
  CreateClientPayload,
  GetClientsRequest,
  PaginatedResponse,
  Client,
  CreateClientResponse,
} from '../types/clientTypes';

const QUERY_KEYS = {
  clients: 'clients',
  clientByDni: (dni: number) => ['client', dni],
};

// Hook para listar clientes con paginación y ordenamiento
export const useClients = (params: GetClientsRequest) => {
  return useQuery<PaginatedResponse<Client>>({
    queryKey: [
      QUERY_KEYS.clients,
      params.pageIndex,
      params.pageSize,
      params.q,
      params.fDni,
      params.fFirstName,
      params.fAddress,
      params.sort,
    ],
    queryFn: () => getClients(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

// Hook para crear un cliente
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateClientResponse, Error, CreateClientPayload>({
    mutationFn: (payload: CreateClientPayload) => createClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] });
    },
  });
};
