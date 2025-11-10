export interface Construction {
  name: string;
  startDate: string;
  endDate: string | null;
  address: string;
  description: string;
  clientDni: number;
}

export interface GetConstructionsRequest {
  pageIndex: number;
  pageSize: number;
  q?: string;
  fAddress?: string;
  fStartDate?: string;
  fEndDate?: string;
  fClientDni?: number;
  fDescription?: string;
  sort?: string;
}

export interface CreateConstructionRequest {
  name: string;
  startDate: string;
  endDate: string | null;
  address: string;
  description: string;
  clientDni: number;
}

interface PaginationData<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  status: number;
};

interface ApiError {
  statusCode: number;
  message: string;
  path: string;
  details: string;
}

export interface GetConstructionsResponse
  extends ApiResponse<PaginationData<Construction>> {}

export interface GetConstructionResponse extends ApiResponse<Construction> {}

export interface CreateConstructionResponse extends ApiResponse<Construction> {
  error?: ApiError;
}

export interface UpdateConstructionResponse extends ApiResponse<Construction> {
  error?: ApiError;
}

export interface DeleteConstructionResponse extends ApiResponse<void> {}
