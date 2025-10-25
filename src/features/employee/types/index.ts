export interface Employee {
  dni: number;
  firstName: string;
  lastName: string;
  workStation: string;
}

export interface GetEmployeesRequest {
  pageIndex: number;
  pageSize: number;
  q?: string;
  fDni?: number;
  fFirstName?: string;
  fLastName?: string;
  fWorkStation?: string;
  sort?: string;
}

export interface CreateEmployeeRequest {
  dni: number;
  firstName: string;
  lastName: string;
  workStation: string;
}

export interface UpdateEmployeeRequest {
  dni?: number;
  firstName?: string;
  lastName?: string;
  workStation?: string;
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

export interface GetEmployeesResponse
  extends ApiResponse<PaginationData<Employee>> {}

export interface GetEmployeeResponse extends ApiResponse<Employee> {}

export interface CreateEmployeeResponse extends ApiResponse<Employee> {
  error?: ApiError;
}

export interface UpdateEmployeeResponse extends ApiResponse<Employee> {
  error?: ApiError;
}

export interface DeleteEmployeeResponse extends ApiResponse<Employee> {}
