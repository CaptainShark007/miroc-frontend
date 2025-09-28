export interface ErrorResponse {
  success: boolean;
  message: string;
  meta: any;
  error: Error;
  status: number;
}

export interface Error {
  statusCode: number;
  message: string;
  path: string;
  details: any;
}
