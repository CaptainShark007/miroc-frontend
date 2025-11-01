import AxiosClient from '@app/axios';
import {
  Client,
  PaginatedResponse,
  CreateClientPayload,
  UpdateClientPayload,
  PatchOperation,
} from '../types/clientTypes';

export const getClients = async (
  pageIndex = 1,
  pageSize = 10,
  search?: string
): Promise<PaginatedResponse<Client>> => {
  const queryParams = new URLSearchParams();
  queryParams.set('pageIndex', pageIndex.toString());
  queryParams.set('pageSize', pageSize.toString());

  if (search) {
    queryParams.set('q', search);
  }

  const response = await AxiosClient.get<PaginatedResponse<Client>>(
    `/api/v1/clients?${queryParams.toString()}`
  );

  return response;
};

export const getClientByDni = async (dni: number): Promise<Client> => {
  return await AxiosClient.get<Client>(`/api/v1/clients/${dni}`);
};

export const createClient = async (
  payload: CreateClientPayload
): Promise<Client> => {
  return await AxiosClient.post<Client>('/api/v1/clients', payload);
};

export const updateClient = async (
  dni: number,
  payload: UpdateClientPayload
): Promise<Client> => {
  return await AxiosClient.put<Client>(`/api/v1/clients/${dni}`, payload);
};

export const patchClient = async (
  dni: number,
  operations: PatchOperation[]
): Promise<Client> => {
  return await AxiosClient.patch<Client>(
    `/api/v1/clients/${dni}`,
    operations
  );
};

export const deleteClient = async (
  dni: number,
  permanent = false
): Promise<void> => {
  const url = permanent
    ? `/api/v1/clients/permanent/${dni}`
    : `/api/v1/clients/${dni}`;
  return await AxiosClient.delete<void>(url);
};
