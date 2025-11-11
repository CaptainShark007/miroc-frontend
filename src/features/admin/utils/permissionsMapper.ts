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
  CREATE_EMPLOYEE: { module: 'empleado', action: 'create' },
  READ_EMPLOYEE: { module: 'empleado', action: 'read' },
  UPDATE_EMPLOYEE: { module: 'empleado', action: 'update' },
  DELETE_EMPLOYEE: { module: 'empleado', action: 'delete' },
  CREATE_PROVIDER: { module: 'proveedor', action: 'create' },
  READ_PROVIDER: { module: 'proveedor', action: 'read' },
  UPDATE_PROVIDER: { module: 'proveedor', action: 'update' },
  DELETE_PROVIDER: { module: 'proveedor', action: 'delete' },
  CREATE_MOVEMENT: { module: 'movimiento', action: 'create' },
  READ_MOVEMENT: { module: 'movimiento', action: 'read' },
  UPDATE_MOVEMENT: { module: 'movimiento', action: 'update' },
  DELETE_MOVEMENT: { module: 'movimiento', action: 'delete' },
  CREATE_CONSTRUCTION: { module: 'obra', action: 'create' },
  READ_CONSTRUCTION: { module: 'obra', action: 'read' },
  UPDATE_CONSTRUCTION: { module: 'obra', action: 'update' },
  DELETE_CONSTRUCTION: { module: 'obra', action: 'delete' },
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
  empleado: {
    create: 'CREATE_EMPLOYEE',
    read: 'READ_EMPLOYEE',
    update: 'UPDATE_EMPLOYEE',
    delete: 'DELETE_EMPLOYEE',
  },
  proveedor: {
    create: 'CREATE_PROVIDER',
    read: 'READ_PROVIDER',
    update: 'UPDATE_PROVIDER',
    delete: 'DELETE_PROVIDER',
  },
  movimiento: {
    create: 'CREATE_MOVEMENT',
    read: 'READ_MOVEMENT',
    update: 'UPDATE_MOVEMENT',
    delete: 'DELETE_MOVEMENT',
  },
  obra: {
    create: 'CREATE_CONSTRUCTION',
    read: 'READ_CONSTRUCTION',
    update: 'UPDATE_CONSTRUCTION',
    delete: 'DELETE_CONSTRUCTION',
  },
};

export const convertAPIRoleToFrontend = (apiRole: {
  name: string;
  permissions: APIPermission[];
}): UIRole => {
  // Inicializar todos los módulos disponibles con arrays vacíos
  const allModules = [
    'usuario',
    'cliente',
    'empleado',
    'proveedor',
    'movimiento',
    'obra',
  ];
  const modulePermissions: Record<string, string[]> = {};

  allModules.forEach((module) => {
    modulePermissions[module] = [];
  });

  // Agregar los permisos que el rol tiene asignados
  apiRole.permissions.forEach((apiPermission) => {
    const mapping = API_TO_FRONTEND_PERMISSIONS[apiPermission];
    if (mapping && modulePermissions[mapping.module] !== undefined) {
      modulePermissions[mapping.module].push(mapping.action);
    }
  });

  // Crear módulos con todos los permisos posibles (create, read, update, delete)
  const modules: UIModule[] = allModules.map((moduleId) => ({
    id: moduleId,
    name: getModuleName(moduleId),
    permissions: ['create', 'read', 'update', 'delete'].map((permId) => ({
      id: permId,
      name: getPermissionName(permId),
      description: getPermissionDescription(permId),
      color: getPermissionColor(permId),
    })),
  }));

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

const getModuleName = (moduleId: string): string => {
  const names: Record<string, string> = {
    usuario: 'Usuarios',
    cliente: 'Clientes',
    empleado: 'Empleados',
    proveedor: 'Proveedores',
    movimiento: 'Movimientos',
    obra: 'Obras',
  };
  return names[moduleId] || moduleId;
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
