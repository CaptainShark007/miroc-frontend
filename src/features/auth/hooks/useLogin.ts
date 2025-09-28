import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/store';
import { setToken } from '../slices/auth.slice';
import { login } from '../api/service';
import { useToast } from '@shared/hooks/useToast';
import { AuthRequest, AuthResponse } from '../types';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToast();

  return useMutation<AuthResponse, Error, AuthRequest>({
    mutationFn: login,
    onSuccess: (response) => {
      dispatch(
        setToken({
          token: response.data.accessToken,
        })
      );

      showSuccess(response.message ?? '¡Inicio de sesión exitoso! Bienvenido.');

      navigate('/dashboard');
    },
    onError: (error: any) => {
      showError(error.message);
    },
  });
};
