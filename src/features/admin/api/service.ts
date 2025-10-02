import AxiosClient from '@app/axios';
import {
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  RolesResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
} from '@features/admin/types';
import { JsonPatchOp } from '@shared/types/json';

export const getRoles = async (): Promise<RolesResponse> => {
  const response = await AxiosClient.get<RolesResponse>(
    `/api/v1/roles?includePermissions=true`
  );

  return response;
};

export const updateRole = async (
  roleName: string,
  data: UpdateRoleRequest
): Promise<UpdateRoleResponse> => {
  const response = await AxiosClient.patch<UpdateRoleResponse>(
    `/api/v1/roles/${roleName}/permissions`,
    data
  );

  return response;
};

export const getUsers = async (
  data: GetUsersRequest
): Promise<GetUsersResponse> => {
  const response = await AxiosClient.get<GetUsersResponse>(
    `/api/v1/users?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`
  );

  return response;
};

export const createUser = async (
  data: CreateUserRequest
): Promise<CreateUserResponse> => {
  const response = await AxiosClient.post<CreateUserResponse>(
    `/api/v1/users`,
    data
  );
  return response;
};

export const updateUser = async (
  dni: number,
  data: JsonPatchOp[]
): Promise<UpdateUserResponse> => {
  const response = await AxiosClient.patch<UpdateUserResponse>(
    `/api/v1/users/${dni}`,
    data
  );
  return response;
};

export const deleteUser = async (data: number): Promise<DeleteUserResponse> => {
  const response = await AxiosClient.delete<DeleteUserResponse>(
    `/api/v1/users/${data}`
  );

  return response;
};
