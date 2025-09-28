export interface Provider {
    cuit: number;
    firstName: string;
    address: string;
    description: string;
}

export interface GetProviderRequest {
  pageIndex: number;
  pageSize: number;
}

export interface CreateProviderRequest {
  cuit: number;
  firstName: string;
  address: string;
  description: string;
}

export interface UpdateProviderRequest {
  cuit?: number;
  firstName?: string;
  lastName?: string;
  description?: string;
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

export interface GetProvidersResponse extends ApiResponse<PaginationData<Provider>> {}

export interface CreateProviderResponse extends ApiResponse<Provider> {
  error?: ApiError;
}

export interface UpdateProviderResponse extends ApiResponse<Provider> {
  error?: ApiError;
}

export interface DeleteProviderResponse extends ApiResponse<Provider> {}