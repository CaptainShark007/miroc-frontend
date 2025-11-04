export interface Client {
  id: string;
  dni: number;
  firstName: string;
  address: string;
}

export interface GetClientsRequest {
  pageIndex: number;
  pageSize: number;
  q?: string;
  fDni?: number;
  fFirstName?: string;
  fAddress?: string;
  sort?: string;
}

export interface CreateClientPayload {
  dni: number;
  firstName: string;
  address: string;
}

export interface UpdateClientPayload {
  dni: number;
  firstName: string;
  address: string;
}

export interface PatchOperation {
  op: 'replace' | 'add' | 'remove';
  path: string;
  value?: any;
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

export interface PaginatedResponse<T> extends ApiResponse<PaginationData<T>> {}

export interface GetClientResponse extends ApiResponse<Client> {}

export interface CreateClientResponse extends ApiResponse<Client> {
  error?: ApiError;
}

export interface UpdateClientResponse extends ApiResponse<Client> {
  error?: ApiError;
}

export interface DeleteClientResponse extends ApiResponse<Client> {}
