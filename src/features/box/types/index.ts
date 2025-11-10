export interface AssociatedEntity {
  type: string;
  key: number;
}

export interface Movement {
  codeMovement: number;
  date: string;
  amount: number;
  paymentMethod: string;
  conceptName: string;
  conceptType: string;
  conceptDescription: string;
  associatedEntity: AssociatedEntity | null;
}

export interface GetMovementsRequest {
  pageIndex: number;
  pageSize: number;
  q?: string;
  fDateFrom?: string;
  fDateTo?: string;
  fPaymentMethod?: string;
  fCode?: number;
  sort?: string;
}

export interface CreateMovementRequest {
  amount: number;
  paymentMethod: string;
  conceptId: number;
  clientDni?: number | null;
  providerCuit?: number | null;
  employeeDni?: number | null;
  constructionName?: string | null;
}

export interface UpdateMovementRequest {
  amount?: number;
  paymentMethod?: string;
  conceptId?: number;
  clientDni?: number | null;
  providerCuit?: number | null;
  employeeDni?: number | null;
  constructionName?: string | null;
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

export interface GetMovementsResponse
  extends ApiResponse<PaginationData<Movement>> {}

export interface GetMovementResponse extends ApiResponse<Movement> {}

export interface CreateMovementResponse extends ApiResponse<null> {
  error?: ApiError;
}

export interface UpdateMovementResponse extends ApiResponse<Movement> {
  error?: ApiError;
}

export interface DeleteMovementResponse extends ApiResponse<null> {}

export interface MovementsSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface GetMovementsSummaryResponse
  extends ApiResponse<MovementsSummary> {}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT',
}

export enum AssociatedEntityType {
  GENERAL = 'GENERAL',
  CLIENTE = 'CLIENTE',
  PROVEEDOR = 'PROVEEDOR',
  EMPLEADO = 'EMPLEADO',
  OBRA = 'OBRA',
}

// Concept types
export interface Concept {
  id: number;
  name: string;
  type: 'ingreso' | 'egreso';
  description: string;
}

export interface CreateConceptRequest {
  name: string;
  type: 'ingreso' | 'egreso';
  description?: string;
}

export interface UpdateConceptRequest {
  name: string;
  type: 'ingreso' | 'egreso';
  description?: string;
}

export interface ConceptFilter {
  q?: string;
  fName?: string;
  fType?: 'ingreso' | 'egreso';
  pageIndex?: number;
  pageSize?: number;
  sort?: string;
}

export interface GetConceptsResponse
  extends ApiResponse<PaginationData<Concept>> {}

// Response for concepts that returns array directly
export interface GetConceptsArrayResponse extends ApiResponse<Concept[]> {}

export interface GetConceptResponse extends ApiResponse<Concept> {}

export interface CreateConceptResponse extends ApiResponse<Concept> {
  error?: ApiError;
}

export interface UpdateConceptResponse extends ApiResponse<Concept> {
  error?: ApiError;
}

export interface DeleteConceptResponse extends ApiResponse<Concept> {}
