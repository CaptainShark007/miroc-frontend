import React from 'react';
import { useAppSelector } from '@app/store';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}
