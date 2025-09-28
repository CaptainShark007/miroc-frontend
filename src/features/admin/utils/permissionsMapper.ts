import { Permission as APIPermission } from '@features/admin/types';

export interface UIPermission {
  id: string;
  name: string;
  description: string;
  color: 'success' | 'info' | 'warning' | 'error';
}

export interface UIModule {
  id: string;
  name: string;
  permissions: UIPermission[];
}

export interface UIRole {
  id: string;
  name: string;
  description: string;
  color: 'primary' | 'secondary';
  modules: UIModule[];
}

export const API_TO_FRONTEND_PERMISSIONS: Record<
  APIPermission,
  { module: string; action: string }
> = {
  CREATE_USER: { module: 'usuario', action: 'create' },
  READ_USER: { module: 'usuario', action: 'read' },
  UPDATE_USER: { module: 'usuario', action: 'update' },
  DELETE_USER: { module: 'usuario', action: 'delete' },
  CREATE_CLIENT: { module: 'cliente', action: 'create' },
  READ_CLIENT: { module: 'cliente', action: 'read' },
  UPDATE_CLIENT: { module: 'cliente', action: 'update' },
  DELETE_CLIENT: { module: 'cliente', action: 'delete' },
};

export const FRONTEND_TO_API_PERMISSIONS: Record<
  string,
  Record<string, APIPermission>
> = {
  usuario: {
    create: 'CREATE_USER',
    read: 'READ_USER',
    update: 'UPDATE_USER',
    delete: 'DELETE_USER',
  },
  cliente: {
    create: 'CREATE_CLIENT',
    read: 'READ_CLIENT',
    update: 'UPDATE_CLIENT',
    delete: 'DELETE_CLIENT',
  },
};

export const convertAPIRoleToFrontend = (apiRole: {
  name: string;
  permissions: APIPermission[];
}): UIRole => {
  const modulePermissions: Record<string, string[]> = {
    usuario: [],
    cliente: [],
  };

  apiRole.permissions.forEach((apiPermission) => {
    const mapping = API_TO_FRONTEND_PERMISSIONS[apiPermission];
    if (mapping) {
      modulePermissions[mapping.module].push(mapping.action);
    }
  });

  const modules: UIModule[] = Object.entries(modulePermissions).map(
    ([moduleId, permissionIds]) => ({
      id: moduleId,
      name: moduleId === 'usuario' ? 'Usuarios' : 'Clientes',
      permissions: permissionIds.map((permId) => ({
        id: permId,
        name: getPermissionName(permId),
        description: getPermissionDescription(permId),
        color: getPermissionColor(permId),
      })),
    })
  );

  return {
    id: apiRole.name,
    name: apiRole.name,
    description: getRoleDescription(apiRole.name),
    color: getRoleColor(apiRole.name),
    modules,
  };
};

export const convertPermissionChangesToAPI = (
  moduleId: string,
  permissionId: string
): APIPermission => {
  return FRONTEND_TO_API_PERMISSIONS[moduleId][permissionId];
};

const getPermissionName = (permId: string): string => {
  const names: Record<string, string> = {
    create: 'Crear',
    read: 'Ver',
    update: 'Editar',
    delete: 'Eliminar',
  };
  return names[permId] || permId;
};

const getPermissionDescription = (permId: string): string => {
  const descriptions: Record<string, string> = {
    create: 'Crear nuevos registros',
    read: 'Visualizar registros',
    update: 'Modificar registros existentes',
    delete: 'Eliminar registros',
  };
  return descriptions[permId] || permId;
};

const getPermissionColor = (
  permId: string
): 'success' | 'info' | 'warning' | 'error' => {
  const colors: Record<string, 'success' | 'info' | 'warning' | 'error'> = {
    create: 'success',
    read: 'info',
    update: 'warning',
    delete: 'error',
  };
  return colors[permId] || 'info';
};

const getRoleDescription = (roleName: string): string => {
  const descriptions: Record<string, string> = {
    ADMINISTRADOR: 'Acceso completo a todo el sistema',
    PRESUPUESTISTA: 'Acceso limitado para gestión de presupuestos',
  };
  return descriptions[roleName] || 'Rol del sistema';
};

const getRoleColor = (roleName: string): 'primary' | 'secondary' => {
  const colors: Record<string, 'primary' | 'secondary'> = {
    ADMINISTRADOR: 'primary',
    PRESUPUESTISTA: 'secondary',
  };
  return colors[roleName] || 'primary';
};
