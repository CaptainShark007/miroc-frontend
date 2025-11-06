import AxiosClient from '@app/axios';
import {
  CreateMovementRequest,
  CreateMovementResponse,
  UpdateMovementResponse,
  DeleteMovementResponse,
  GetMovementsRequest,
  GetMovementsResponse,
  GetMovementResponse,
  ConceptFilter,
  GetConceptsArrayResponse,
  GetConceptResponse,
  CreateConceptRequest,
  CreateConceptResponse,
  UpdateConceptRequest,
  UpdateConceptResponse,
  DeleteConceptResponse,
} from '@features/box/types';

export const getMovements = async (
  data: GetMovementsRequest
): Promise<GetMovementsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.set('pageIndex', data.pageIndex.toString());
  queryParams.set('pageSize', data.pageSize.toString());

  if (data.q) {
    queryParams.set('q', data.q);
  }
  if (data.fDateFrom) {
    queryParams.set('fDateFrom', data.fDateFrom);
  }
  if (data.fDateTo) {
    queryParams.set('fDateTo', data.fDateTo);
  }
  if (data.fPaymentMethod) {
    queryParams.set('fPaymentMethod', data.fPaymentMethod);
  }
  if (data.fCode) {
    queryParams.set('fCode', data.fCode.toString());
  }
  if (data.sort) {
    queryParams.set('sort', data.sort);
  }

  const response = await AxiosClient.get<GetMovementsResponse>(
    `/api/v1/movements?${queryParams.toString()}`
  );

  return response;
};

export const getMovementByCode = async (
  code: number
): Promise<GetMovementResponse> => {
  const response = await AxiosClient.get<GetMovementResponse>(
    `/api/v1/movements/${code}`
  );

  return response;
};

export const createMovement = async (
  data: CreateMovementRequest
): Promise<CreateMovementResponse> => {
  const response = await AxiosClient.post<CreateMovementResponse>(
    `/api/v1/movements`,
    data
  );
  return response;
};

export const updateMovement = async (
  code: number,
  data: CreateMovementRequest
): Promise<UpdateMovementResponse> => {
  const response = await AxiosClient.put<UpdateMovementResponse>(
    `/api/v1/movements/${code}`,
    data
  );
  return response;
};

export const deleteMovement = async (
  code: number
): Promise<DeleteMovementResponse> => {
  const response = await AxiosClient.delete<DeleteMovementResponse>(
    `/api/v1/movements/${code}`
  );

  return response;
};

// Concept API endpoints
export const getConcepts = async (
  filters?: ConceptFilter
): Promise<GetConceptsArrayResponse> => {
  const queryParams = new URLSearchParams();

  if (filters) {
    queryParams.set('pageIndex', (filters.pageIndex || 1).toString());
    queryParams.set('pageSize', (filters.pageSize || 10).toString());

    if (filters.q) {
      queryParams.set('q', filters.q);
    }
    if (filters.fName) {
      queryParams.set('fName', filters.fName);
    }
    if (filters.fType) {
      queryParams.set('fType', filters.fType);
    }
    if (filters.sort) {
      queryParams.set('sort', filters.sort);
    }
  } else {
    queryParams.set('pageIndex', '1');
    queryParams.set('pageSize', '10');
  }

  const response = await AxiosClient.get<GetConceptsArrayResponse>(
    `/api/v1/concepts?${queryParams.toString()}`
  );

  return response;
};

export const getConceptById = async (
  id: number
): Promise<GetConceptResponse> => {
  const response = await AxiosClient.get<GetConceptResponse>(
    `/api/v1/concepts/${id}`
  );

  return response;
};

export const createConcept = async (
  data: CreateConceptRequest
): Promise<CreateConceptResponse> => {
  const response = await AxiosClient.post<CreateConceptResponse>(
    `/api/v1/concepts`,
    data
  );
  return response;
};

export const updateConcept = async (
  id: number,
  data: UpdateConceptRequest
): Promise<UpdateConceptResponse> => {
  const response = await AxiosClient.put<UpdateConceptResponse>(
    `/api/v1/concepts/${id}`,
    data
  );
  return response;
};

export const deleteConcept = async (
  id: number
): Promise<DeleteConceptResponse> => {
  const response = await AxiosClient.delete<DeleteConceptResponse>(
    `/api/v1/concepts/${id}`
  );

  return response;
};
