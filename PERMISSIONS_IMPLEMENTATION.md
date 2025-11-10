# Sistema de Permisos - Implementación Completa

## Hook usePermissions

Ya creado en: `src/shared/hooks/usePermissions.ts`

## Logs del Token

Ya agregados en: `src/shared/hooks/useAuth.ts`

---

## PROVIDER MODULE

### 1. ProviderHeader.tsx

Agregar import:

```typescript
import { usePermissions } from '@shared/hooks/usePermissions';
```

Dentro del componente:

```typescript
const { canCreate } = usePermissions();
const canCreateProvider = canCreate('provider');
```

Envolver el botón:

```typescript
{canCreateProvider && (
  <Button ...>
    Crear Proveedor
  </Button>
)}
```

### 2. ProviderActions.tsx

Agregar import:

```typescript
import { usePermissions } from '@shared/hooks/usePermissions';
```

Dentro del componente:

```typescript
const { canUpdate, canDelete } = usePermissions();
const canEditProvider = canUpdate('provider');
const canDeleteProvider = canDelete('provider');
```

Envolver botones:

```typescript
{canEditProvider && (
  <Tooltip title='Editar proveedor'>
    <IconButton ...>
      <Edit />
    </IconButton>
  </Tooltip>
)}

{canDeleteProvider && (
  <Tooltip title='Eliminar proveedor'>
    <IconButton ...>
      <Delete />
    </IconButton>
  </Tooltip>
)}
```

---

## EMPLOYEE MODULE

### 1. EmployeeHeader.tsx

Igual que Provider pero con 'employee'

### 2. EmployeeActions.tsx

Igual que Provider pero con 'employee'

---

## CONSTRUCTION MODULE

### 1. ConstructionHeader.tsx

Igual que Provider pero con 'construction'

### 2. ConstructionActions.tsx

Igual que Provider pero con 'construction'

---

## Formato de Permisos en el Token

El token JWT incluye permisos en formato `ACTION_MODULE`:

```json
{
  "id": "usr-20251025180502-bca01941",
  "dni": "46924236",
  "email": "user@example.com",
  "role": "ADMIN" | "PRESUPUESTISTA",
  "permission": [
    "CREATE_USER",
    "READ_USER",
    "UPDATE_USER",
    "DELETE_USER",
    "CREATE_CLIENT",
    "READ_CLIENT",
    "UPDATE_CLIENT",
    "DELETE_CLIENT",
    "CREATE_EMPLOYEE",
    "READ_EMPLOYEE",
    "UPDATE_EMPLOYEE",
    "DELETE_EMPLOYEE",
    "CREATE_PROVIDER",
    "READ_PROVIDER",
    "UPDATE_PROVIDER",
    "DELETE_PROVIDER",
    "CREATE_BOX",
    "READ_BOX",
    "UPDATE_BOX",
    "DELETE_BOX",
    "CREATE_CONSTRUCTION",
    "READ_CONSTRUCTION",
    "UPDATE_CONSTRUCTION",
    "DELETE_CONSTRUCTION"
  ],
  "nbf": 1762772486,
  "exp": 1762776086,
  "iat": 1762772486,
  "iss": "http://localhost:5027/",
  "aud": "http://localhost:5027/"
}
```

**Nota importante**:

- El campo es `permission` (singular), no `permissions` (plural)
- El formato de cada permiso es `ACTION_MODULE` (ej: `CREATE_CLIENT`, `UPDATE_BOX`)
- El hook `usePermissions` convierte automáticamente el formato interno (`canCreate('client')`) al formato del backend (`CREATE_CLIENT`)

## Comportamiento

- **ADMIN**: Siempre tiene todos los permisos
- **Sin permiso de create**: No ve botones de "Crear" ni "Gestionar Conceptos"
- **Sin permiso de update**: No ve botones de "Editar"
- **Sin permiso de delete**: No ve botones de "Eliminar"
- **Solo lectura**: Solo ve botón de "Ver detalle" en movimientos

## Archivos Modificados

✅ BOX (Movimientos):

- MovementsHeader.tsx
- MovementActions.tsx

✅ CLIENT:

- ClientHeader.tsx
- ClientActions.tsx

✅ PROVIDER:

- ProviderHeader.tsx
- ProviderActions.tsx

✅ EMPLOYEE:

- EmployeesHeader.tsx
- EmployeeActions.tsx

✅ CONSTRUCTION:

- ConstructionHeader.tsx
- ConstructionActions.tsx

## ✅ IMPLEMENTACIÓN COMPLETADA

Todos los módulos (Box, Client, Provider, Employee, Construction) ahora tienen validaciones de permisos implementadas:

- Los usuarios con permisos de solo lectura no verán botones de crear, editar ni eliminar
- Los usuarios con rol ADMIN tienen acceso completo automáticamente
- Cada botón de acción se muestra solo si el usuario tiene el permiso correspondiente
