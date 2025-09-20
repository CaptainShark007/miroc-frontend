export interface Role {
  name: string;
  permissions: Permission[];
}

export interface UpdateRoleRequest {
  addPermissions: Permission[];
  removePermissions: Permission[];
}

export type Permission =
  | 'CREATE_USER'
  | 'READ_USER'
  | 'UPDATE_USER'
  | 'DELETE_USER'
  | 'CREATE_CLIENT'
  | 'READ_CLIENT'
  | 'UPDATE_CLIENT'
  | 'DELETE_CLIENT';

export interface User {
  id: string;
  dni: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
}

export interface GetUsersRequest {
  pageIndex: number;
  pageSize: number;
}

export interface CreateUserRequest {
  dni: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UpdateUserRequest {
  dni?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface PaginationData<T> {
  items: T[];
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  status: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  path: string;
  details: string;
}

export interface RolesResponse extends ApiResponse<Role[]> {}

export interface UpdateRoleResponse extends ApiResponse<Role> {}

export interface GetUsersResponse extends ApiResponse<PaginationData<User>> {}

export interface CreateUserResponse extends ApiResponse<User> {
  error?: ApiError;
}

export interface UpdateUserResponse extends ApiResponse<User> {
  error?: ApiError;
}

export interface DeleteUserResponse extends ApiResponse<User> {}
