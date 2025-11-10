import { useAuth } from './useAuth';

export type Module =
  | 'box'
  | 'client'
  | 'provider'
  | 'employee'
  | 'construction';
export type Action = 'read' | 'create' | 'update' | 'delete';

// Mapeo de módulos internos a nombres del backend
const MODULE_BACKEND_MAP: Record<Module, string> = {
  box: 'MOVEMENT',
  client: 'CLIENT',
  provider: 'PROVIDER',
  employee: 'EMPLOYEE',
  construction: 'CONSTRUCTION',
};

// Mapeo de acciones internas a nombres del backend
const ACTION_BACKEND_MAP: Record<Action, string> = {
  create: 'CREATE',
  read: 'READ',
  update: 'UPDATE',
  delete: 'DELETE',
};

export const usePermissions = () => {
  const { decodedToken, isAdmin } = useAuth();

  const hasPermission = (module: Module, action: Action): boolean => {
    if (isAdmin()) {
      return true;
    }

    // Obtener permisos del token (nota: es 'permission', no 'permissions')
    const permissions = decodedToken?.permission || [];

    // Construir el formato esperado del backend: "ACTION_MODULE"
    const backendModule = MODULE_BACKEND_MAP[module];
    const backendAction = ACTION_BACKEND_MAP[action];
    const permissionKey = `${backendAction}_${backendModule}`;

    return permissions.includes(permissionKey);
  };

  const canRead = (module: Module): boolean => {
    return hasPermission(module, 'read');
  };

  const canCreate = (module: Module): boolean => {
    return hasPermission(module, 'create');
  };

  const canUpdate = (module: Module): boolean => {
    return hasPermission(module, 'update');
  };

  const canDelete = (module: Module): boolean => {
    return hasPermission(module, 'delete');
  };

  const getModulePermissions = (module: Module) => {
    return {
      canRead: canRead(module),
      canCreate: canCreate(module),
      canUpdate: canUpdate(module),
      canDelete: canDelete(module),
    };
  };

  const hasAnyPermission = (module: Module): boolean => {
    return (
      canRead(module) ||
      canCreate(module) ||
      canUpdate(module) ||
      canDelete(module)
    );
  };

  const hasAnyActionPermission = (module: Module): boolean => {
    return canUpdate(module) || canDelete(module);
  };

  return {
    hasPermission,
    canRead,
    canCreate,
    canUpdate,
    canDelete,
    getModulePermissions,
    hasAnyPermission,
    hasAnyActionPermission,
    isAdmin: isAdmin(),
  };
};
