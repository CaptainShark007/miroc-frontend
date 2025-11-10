import { ReactNode } from 'react';
import { usePermissions, Module, Action } from '@shared/hooks/usePermissions';
import NoPermissions from './NoPermissions';

interface PermissionGuardProps {
  children: ReactNode;
  module: Module;
  action: Action;
  moduleName?: string;
}

export default function PermissionGuard({
  children,
  module,
  action,
  moduleName,
}: PermissionGuardProps) {
  const { hasPermission } = usePermissions();

  if (!hasPermission(module, action)) {
    return <NoPermissions moduleName={moduleName} />;
  }

  return <>{children}</>;
}
