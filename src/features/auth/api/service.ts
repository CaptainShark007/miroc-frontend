import AxiosClient from '@app/axios';
import { AuthRequest, AuthResponse } from '@features/auth/types';

export const login = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await AxiosClient.post<AuthResponse>(
    `api/v1/auth/login`,
    data
  );

  return response;
};
