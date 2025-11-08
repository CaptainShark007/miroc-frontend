import AxiosClient from '@app/axios';
import {
  CreateConstructionRequest,
  CreateConstructionResponse,
  UpdateConstructionResponse,
  DeleteConstructionResponse,
  GetConstructionsRequest,
  GetConstructionsResponse,
  GetConstructionResponse,
} from '@features/construction/types/index';
import { JsonPatchOp } from '@shared/types/json';

export const getConstructions = async (
  data: GetConstructionsRequest
): Promise<GetConstructionsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.set('pageIndex', data.pageIndex.toString());
  queryParams.set('pageSize', data.pageSize.toString());

  if (data.q) {
    queryParams.set('q', data.q);
  }
  if (data.fAddress) {
    queryParams.set('fAddress', data.fAddress);
  }
  if (data.fStartDate) {
    queryParams.set('fStartDate', data.fStartDate);
  }
  if (data.fEndDate) {
    queryParams.set('fEndDate', data.fEndDate);
  }
  if (data.fDescription) {
    queryParams.set('fDescripcion', data.fDescription);
  }
  if (data.fClientDni) {
    queryParams.set('fDniCliente', data.fClientDni.toString());
  }
  if (data.sort) {
    queryParams.set('sort', data.sort);
  }

  const response = await AxiosClient.get<GetConstructionsResponse>(
    `/api/v1/constructions?${queryParams.toString()}`
  );

  return response;
};

export const getConstructionByNombre = async (
  name: string
): Promise<GetConstructionResponse> => {
  return await AxiosClient.get<GetConstructionResponse>(
    `/api/v1/constructions/${name}`
  );
};

export const createConstruction = async (
  data: CreateConstructionRequest
): Promise<CreateConstructionResponse> => {
  return await AxiosClient.post<CreateConstructionResponse>(
    '/api/v1/constructions',
    data
  );
};

export const updateConstruction = async (
  name: string,
  data: JsonPatchOp[]
): Promise<UpdateConstructionResponse> => {
  return await AxiosClient.put<UpdateConstructionResponse>(
    `/api/v1/constructions/${name}`,
    data
  );
};

export const deleteConstruction = async (
  name: string
): Promise<DeleteConstructionResponse> => {
  const response = await AxiosClient.delete<DeleteConstructionResponse>(
    `/api/v2/constructions/${name}`
  );
  return response;
};
