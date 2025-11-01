import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getClients,
  getClientByDni,
  createClient,
  updateClient,
  patchClient,
  deleteClient,
} from '../api/service';
import {
  CreateClientPayload,
  UpdateClientPayload,
  PatchOperation,
} from '../types/clientTypes';

const QUERY_KEYS = {
  clients: 'clients',
  clientByDni: (dni: number) => ['client', dni],
};

// Hook para listar clientes con paginación
export const useClients = (pageIndex = 1, pageSize = 10, search?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.clients, pageIndex, pageSize, search],
    queryFn: () => getClients(pageIndex, pageSize, search),
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

  return useMutation({
    mutationFn: (payload: CreateClientPayload) => createClient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] });
    },
  });
};

// Hook para actualizar un cliente (PUT completo)
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      dni,
      payload,
    }: {
      dni: number;
      payload: UpdateClientPayload;
    }) => updateClient(dni, payload),
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

  return useMutation({
    mutationFn: ({
      dni,
      operations,
    }: {
      dni: number;
      operations: PatchOperation[];
    }) => patchClient(dni, operations),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clientByDni(variables.dni),
      });
    },
  });
};

// Hook para eliminar un cliente
export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dni, permanent }: { dni: number; permanent?: boolean }) =>
      deleteClient(dni, permanent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.clients] });
    },
  });
};
