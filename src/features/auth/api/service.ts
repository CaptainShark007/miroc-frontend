import AxiosClient from '@/app/axios';
import { AuthRequest, AuthResponse } from '@/features/auth/types';

export const login = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await AxiosClient.post<AuthResponse>(`api/User/login`, data);

  return response;
};
