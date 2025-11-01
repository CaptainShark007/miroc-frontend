export interface Client {
  id: string;
  dni: number;
  firstName: string;
  address: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
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
