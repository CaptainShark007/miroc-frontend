import { useAuth } from '@shared/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {
  const { isAdmin } = useAuth();

  if (!isAdmin()) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
}
