import { useAppSelector } from '@/app/store';
import { decodeJWT } from '@/shared/utils/jwt';
import { JwtPayload } from '@/features/auth/types';

export const useAuth = () => {
  const token = useAppSelector((state) => state.auth.token);

  const getDecodedToken = (): JwtPayload | null => {
    if (!token) return null;
    return decodeJWT<JwtPayload>(token);
  };

  const hasRole = (role: string): boolean => {
    const decoded = getDecodedToken();
    return decoded?.role === role;
  };

  const isAdmin = (): boolean => {
    return hasRole('ADMIN');
  };

  const getCurrentUser = () => {
    const decoded = getDecodedToken();
    return {
      userId: decoded?.userId,
      username: decoded?.username,
      role: decoded?.role,
    };
  };

  return {
    token,
    isAuthenticated: !!token,
    hasRole,
    isAdmin,
    getCurrentUser,
    decodedToken: getDecodedToken(),
  };
};
