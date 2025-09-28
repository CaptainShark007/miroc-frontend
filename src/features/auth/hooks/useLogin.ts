import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/store';
import { setToken } from '../slices/auth.slice';
import { login } from '../api/service';
import { useToast } from '@shared/hooks/useToast';
import { AuthRequest, AuthResponse } from '../types';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@shared/types/errorResponse';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToast();

  return useMutation<AuthResponse, ErrorResponse, AuthRequest>({
    mutationFn: login,
    onSuccess: (res) => {
      dispatch(
        setToken({
          token: res.data.accessToken,
        })
      );

      showSuccess(res.message ?? '¡Inicio de sesión exitoso! Bienvenido.');

      navigate('/dashboard');
    },
    onError: (res) => {
      showError(res.error.message);
    },
  });
};
