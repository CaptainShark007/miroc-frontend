import { login } from '@features/auth/api/service';
import { AuthRequest, AuthResponse } from '@features/auth/types';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: login,
  });
};
