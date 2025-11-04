import AxiosClient from '@app/axios';
import {
  Client,
  PaginatedResponse,
  CreateClientPayload,
  PatchOperation,
  GetClientsRequest,
  GetClientResponse,
  CreateClientResponse,
  UpdateClientResponse,
  DeleteClientResponse,
} from '../types/clientTypes';
import { JsonPatchOp } from '@shared/types/json';

export const getClients = async (
  data: GetClientsRequest
): Promise<PaginatedResponse<Client>> => {
  const queryParams = new URLSearchParams();
  queryParams.set('pageIndex', data.pageIndex.toString());
  queryParams.set('pageSize', data.pageSize.toString());

  if (data.q) {
    queryParams.set('q', data.q);
  }
  if (data.fDni) {
    queryParams.set('fDni', data.fDni.toString());
  }
  if (data.fFirstName) {
    queryParams.set('fFirstName', data.fFirstName);
  }
  if (data.fAddress) {
    queryParams.set('fAddress', data.fAddress);
  }
  if (data.sort) {
    queryParams.set('sort', data.sort);
  }

  const response = await AxiosClient.get<PaginatedResponse<Client>>(
    `/api/v1/clients?${queryParams.toString()}`
  );

  return response;
};

export const getClientByDni = async (
  dni: number
): Promise<GetClientResponse> => {
  const response = await AxiosClient.get<GetClientResponse>(
    `/api/v1/clients/${dni}`
  );
  return response;
};

export const createClient = async (
  payload: CreateClientPayload
): Promise<CreateClientResponse> => {
  const response = await AxiosClient.post<CreateClientResponse>(
    `/api/v1/clients`,
    payload
  );
  return response;
};

export const updateClient = async (
  dni: number,
  data: JsonPatchOp[]
): Promise<UpdateClientResponse> => {
  const response = await AxiosClient.patch<UpdateClientResponse>(
    `/api/v1/clients/${dni}`,
    data
  );
  return response;
};

export const patchClient = async (
  dni: number,
  operations: PatchOperation[]
): Promise<UpdateClientResponse> => {
  const jsonPatch: JsonPatchOp[] = operations.map(op => ({
    op: op.op,
    path: op.path,
    value: op.value
  }));
  return updateClient(dni, jsonPatch);
};

export const deleteClient = async (
  dni: number,
  permanent = false
): Promise<DeleteClientResponse> => {
  const url = permanent
    ? `/api/v1/clients/permanent/${dni}`
    : `/api/v1/clients/${dni}`;
  const response = await AxiosClient.delete<DeleteClientResponse>(url);
  return response;
};
