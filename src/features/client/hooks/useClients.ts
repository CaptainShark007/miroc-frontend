import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getClients,
  getClientByDni,
  createClient,
  updateClient,
  patchClient,
} from '../api/service';
import {
  CreateClientPayload,
  PatchOperation,
  GetClientsRequest,
  PaginatedResponse,
  Client,
  CreateClientResponse,
  UpdateClientResponse,
} from '../types/clientTypes';
import { JsonPatchOp } from '@shared/types/json';

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

// Hook para obtener un cliente por DNI
export const useClientByDni = (dni: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.clientByDni(dni),
    queryFn: () => getClientByDni(dni),
    enabled: !!dni,
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

// Hook para actualizar un cliente (PATCH con JSON Patch)
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateClientResponse, Error, { dni: number; payload: JsonPatchOp[] }>({
    mutationFn: ({ dni, payload }) => updateClient(dni, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clientByDni(variables.dni),
      });
    },
  });
};

// Hook para actualizar parcialmente un cliente (PATCH)
export const usePatchClient = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateClientResponse, Error, { dni: number; operations: PatchOperation[] }>({
    mutationFn: ({ dni, operations }) => patchClient(dni, operations),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clientByDni(variables.dni),
      });
    },
  });
};
