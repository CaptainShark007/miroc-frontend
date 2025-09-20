// Tipos para el sistema de permisos

export interface Permission {
  id: string;
  name: string;
  description: string;
  color: 'success' | 'info' | 'warning' | 'error';
}

export interface Module {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: 'primary' | 'secondary';
  modules: Module[];
}

// Configuración de permisos disponibles
export const PERMISSIONS: Record<string, Permission> = {
  create: {
    id: 'create',
    name: 'Crear',
    description: 'Crear nuevos registros',
    color: 'success',
  },
  read: {
    id: 'read',
    name: 'Ver',
    description: 'Visualizar registros',
    color: 'info',
  },
  update: {
    id: 'update',
    name: 'Editar',
    description: 'Modificar registros existentes',
    color: 'warning',
  },
  delete: {
    id: 'delete',
    name: 'Eliminar',
    description: 'Eliminar registros',
    color: 'error',
  },
} as const;

// Configuración de módulos disponibles
export const MODULES = {
  usuario: {
    id: 'usuario',
    name: 'Usuarios',
  },
  cliente: {
    id: 'cliente',
    name: 'Clientes',
  },
} as const;

// Configuración de roles por defecto
export const DEFAULT_ROLES_CONFIG = {
  ADMINISTRADOR: {
    id: 'ADMINISTRADOR',
    name: 'Administrador',
    description: 'Acceso completo a todo el sistema',
    color: 'primary' as const,
    modulePermissions: {
      usuario: ['create', 'read', 'update', 'delete'],
      cliente: ['create', 'read', 'update', 'delete'],
    },
  },
  PRESUPUESTISTA: {
    id: 'PRESUPUESTISTA',
    name: 'Presupuestista',
    description: 'Acceso limitado para gestión de presupuestos',
    color: 'secondary' as const,
    modulePermissions: {
      usuario: ['read'],
      cliente: ['create', 'read', 'update'],
    },
  },
} as const;

// Función helper para construir roles desde la configuración
export const buildRolesFromConfig = (): Role[] => {
  return Object.values(DEFAULT_ROLES_CONFIG).map((roleConfig) => ({
    ...roleConfig,
    modules: Object.entries(roleConfig.modulePermissions).map(
      ([moduleId, permissionIds]) => ({
        ...MODULES[moduleId as keyof typeof MODULES],
        permissions: permissionIds.map((permId: string) => PERMISSIONS[permId]),
      })
    ),
  }));
};

// Tipos para el API cuando implementes la conexión
export interface UserPermissionRequest {
  userId: string;
  roleId: string;
}

export interface UserPermissionResponse {
  userId: string;
  role: Role;
  effectivePermissions: {
    [moduleId: string]: string[]; // Array de permission IDs
  };
}

export interface GetUserPermissionsResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  permissions: UserPermissionResponse;
}
