import AxiosClient from '@app/axios';
import {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
  UpdateEmployeeResponse,
  DeleteEmployeeResponse,
  GetEmployeesRequest,
  GetEmployeesResponse,
  GetEmployeeResponse,
} from '@features/employee/types';
import { JsonPatchOp } from '@shared/types/json';

export const getEmployees = async (
  data: GetEmployeesRequest
): Promise<GetEmployeesResponse> => {
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
  if (data.fLastName) {
    queryParams.set('fLastName', data.fLastName);
  }
  if (data.fWorkStation) {
    queryParams.set('fWorkStation', data.fWorkStation);
  }
  if (data.sort) {
    queryParams.set('sort', data.sort);
  }

  const response = await AxiosClient.get<GetEmployeesResponse>(
    `/api/v1/employees?${queryParams.toString()}`
  );

  return response;
};

export const getEmployeeByDni = async (
  dni: number
): Promise<GetEmployeeResponse> => {
  const response = await AxiosClient.get<GetEmployeeResponse>(
    `/api/v1/employees/${dni}`
  );

  return response;
};

export const createEmployee = async (
  data: CreateEmployeeRequest
): Promise<CreateEmployeeResponse> => {
  const response = await AxiosClient.post<CreateEmployeeResponse>(
    `/api/v1/employees`,
    data
  );
  return response;
};

export const updateEmployee = async (
  dni: number,
  data: JsonPatchOp[]
): Promise<UpdateEmployeeResponse> => {
  const response = await AxiosClient.patch<UpdateEmployeeResponse>(
    `/api/v1/employees/${dni}`,
    data
  );
  return response;
};

export const deleteEmployee = async (
  dni: number
): Promise<DeleteEmployeeResponse> => {
  const response = await AxiosClient.delete<DeleteEmployeeResponse>(
    `/api/v1/employees/${dni}`
  );

  return response;
};
