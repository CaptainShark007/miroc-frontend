import React from 'react';
import { useAppSelector } from '@app/store';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const token = useAppSelector((state) => state.auth.token);

  if (token) {
    return <Navigate to='/dashboard' replace />;
  }

  return <>{children}</>;
}
