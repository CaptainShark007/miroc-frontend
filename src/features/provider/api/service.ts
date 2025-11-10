import AxiosClient from '@app/axios';

import {
  GetProvidersResponse,
  GetProviderResponse,
  CreateProviderRequest,
  CreateProviderResponse,
  GetProviderRequest,
  UpdateProviderRequest,
  UpdateProviderResponse,
  DeleteProviderResponse,
} from '@features/provider/types';

export const getProviders = async (
  data: GetProviderRequest
): Promise<GetProvidersResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.set('pageIndex', data.pageIndex.toString());
  queryParams.set('pageSize', data.pageSize.toString());

  if (data.q) {
    queryParams.set('q', data.q);
  }
  if (data.fCuit) {
    queryParams.set('fCuit', data.fCuit.toString());
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

  const response = await AxiosClient.get<GetProvidersResponse>(
    `/api/v1/providers?${queryParams.toString()}`
  );
  return response;
};

export const createProvider = async (
  data: CreateProviderRequest
): Promise<CreateProviderResponse> => {
  const response = await AxiosClient.post<CreateProviderResponse>(
    `/api/v1/providers`,
    data
  );
  return response;
};

export const updateProvider = async (
  providerDni: number,
  data: UpdateProviderRequest
): Promise<UpdateProviderResponse> => {
  const response = await AxiosClient.put<UpdateProviderResponse>(
    `/api/v1/providers/${providerDni}`,
    data
  );
  return response;
};

export const getProviderByCuit = async (
  cuit: number
): Promise<GetProviderResponse> => {
  const response = await AxiosClient.get<GetProviderResponse>(
    `/api/v1/providers/${cuit}`
  );
  return response;
};

export const deleteProvider = async (
  data: number
): Promise<DeleteProviderResponse> => {
  const response = await AxiosClient.delete<DeleteProviderResponse>(
    `/api/v1/providers/${data}`
  );
  return response;
};
