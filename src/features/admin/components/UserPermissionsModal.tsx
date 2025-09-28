import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  IconButton,
  CircularProgress,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  ExpandMore,
  Close,
  AdminPanelSettings,
  Assignment,
  Person,
  Groups,
  Save,
} from '@mui/icons-material';
import { useRoles } from '@features/admin/hooks/useRoles';
import { useUpdateRole } from '@features/admin/hooks/useUpdateRole';
import {
  convertAPIRoleToFrontend,
  convertPermissionChangesToAPI,
  UIRole,
  UIModule,
} from '@features/admin/utils/permissionsMapper';
import { Permission as APIPermission } from '@features/admin/types';

interface UserPermissionsModalProps {
  open: boolean;
  onClose: () => void;
}

interface PermissionChange {
  moduleId: string;
  permissionId: string;
  isAdded: boolean;
}

const moduleIcons: Record<string, React.ReactNode> = {
  usuario: <Person />,
  cliente: <Groups />,
};

export default function UserPermissionsModal({
  open,
  onClose,
}: UserPermissionsModalProps) {
  const [expandedRole, setExpandedRole] = useState<string | false>(false);
  const [pendingChanges, setPendingChanges] = useState<
    Record<string, PermissionChange[]>
  >({});

  const { data: rolesData, isLoading, error } = useRoles();
  const updateRoleMutation = useUpdateRole();

  const roles: UIRole[] = rolesData?.data
    ? rolesData.data.map(convertAPIRoleToFrontend)
    : [];
  const handleRoleChange =
    (roleId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedRole(isExpanded ? roleId : false);
    };

  const togglePermission = (
    roleId: string,
    moduleId: string,
    permissionId: string
  ) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;

    const module = role.modules.find((m) => m.id === moduleId);
    if (!module) return;

    const hasPermission = module.permissions.some((p) => p.id === permissionId);

    setPendingChanges((prev) => {
      const roleChanges = prev[roleId] || [];
      const existingChange = roleChanges.find(
        (c) => c.moduleId === moduleId && c.permissionId === permissionId
      );

      if (existingChange) {
        return {
          ...prev,
          [roleId]: roleChanges.filter(
            (c) => !(c.moduleId === moduleId && c.permissionId === permissionId)
          ),
        };
      } else {
        return {
          ...prev,
          [roleId]: [
            ...roleChanges,
            {
              moduleId,
              permissionId,
              isAdded: !hasPermission,
            },
          ],
        };
      }
    });
  };

  const isPermissionActive = (
    roleId: string,
    moduleId: string,
    permissionId: string
  ): boolean => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return false;

    const module = role.modules.find((m) => m.id === moduleId);
    const hasPermission =
      module?.permissions.some((p) => p.id === permissionId) || false;

    const roleChanges = pendingChanges[roleId] || [];
    const pendingChange = roleChanges.find(
      (c) => c.moduleId === moduleId && c.permissionId === permissionId
    );

    if (pendingChange) {
      return pendingChange.isAdded;
    }

    return hasPermission;
  };

  const saveChanges = () => {
    Object.entries(pendingChanges).forEach(([roleId, changes]) => {
      if (changes.length === 0) return;

      const addPermissions: APIPermission[] = [];
      const removePermissions: APIPermission[] = [];

      changes.forEach((change) => {
        const apiPermission = convertPermissionChangesToAPI(
          change.moduleId,
          change.permissionId
        );
        if (change.isAdded) {
          addPermissions.push(apiPermission);
        } else {
          removePermissions.push(apiPermission);
        }
      });

      updateRoleMutation.mutate({
        roleName: roleId,
        data: { addPermissions, removePermissions },
      });
    });

    setPendingChanges({});
  };

  const cancelChanges = () => {
    setPendingChanges({});
  };

  const hasChanges = Object.values(pendingChanges).some(
    (changes) => changes.length > 0
  );

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
        <DialogContent
          sx={{ display: 'flex', justifyContent: 'center', py: 4 }}
        >
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
        <DialogContent>
          <Alert severity='error'>Error al cargar los roles y permisos</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      disableEscapeKeyDown={false}
      disablePortal={false}
      keepMounted={false}
      aria-labelledby='permissions-dialog-title'
      aria-describedby='permissions-dialog-description'
      container={() => document.body}
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        id='permissions-dialog-title'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AdminPanelSettings color='primary' />
          <Box>
            <Typography variant='h6'>Gestión de Permisos y Roles</Typography>
            <Typography variant='body2' color='text.secondary'>
              Configuración del sistema de permisos
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size='small'
          autoFocus
          aria-label='Cerrar modal de permisos'
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        <Typography
          id='permissions-dialog-description'
          variant='body2'
          color='text.secondary'
          sx={{ mb: 3 }}
        >
          Los permisos se organizan por roles. Cada rol tiene acceso a
          diferentes módulos y operaciones dentro del sistema.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant='h6'
            sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Assignment color='primary' />
            Roles y Permisos del Sistema
          </Typography>

          {roles.map((role: UIRole) => (
            <Accordion
              key={role.id}
              expanded={expandedRole === role.id}
              onChange={handleRoleChange(role.id)}
              sx={{
                mb: 1,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                  }}
                >
                  <Chip
                    label={role.name}
                    color={role.color}
                    variant='outlined'
                    size='small'
                  />
                  <Typography variant='body2' color='text.secondary'>
                    {role.description}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 3,
                  }}
                >
                  {role.modules.map((module: UIModule) => (
                    <Box key={module.id}>
                      <Box
                        sx={{
                          p: 2,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          bgcolor: 'background.paper',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          {moduleIcons[module.id]}
                          <Typography variant='subtitle1' fontWeight='medium'>
                            {module.name}
                          </Typography>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                          }}
                        >
                          {['create', 'read', 'update', 'delete'].map(
                            (permissionId) => (
                              <FormControlLabel
                                key={permissionId}
                                control={
                                  <Switch
                                    checked={isPermissionActive(
                                      role.id,
                                      module.id,
                                      permissionId
                                    )}
                                    onChange={() =>
                                      togglePermission(
                                        role.id,
                                        module.id,
                                        permissionId
                                      )
                                    }
                                    size='small'
                                  />
                                }
                                label={
                                  <Typography variant='body2'>
                                    {permissionId === 'create' && 'Crear'}
                                    {permissionId === 'read' && 'Ver'}
                                    {permissionId === 'update' && 'Editar'}
                                    {permissionId === 'delete' && 'Eliminar'}
                                  </Typography>
                                }
                              />
                            )
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {hasChanges && (
          <>
            <Alert severity='info' sx={{ mb: 2 }}>
              Tienes cambios pendientes. Asegúrate de guardar los cambios antes
              de cerrar el modal.
            </Alert>
            <Alert severity='info' sx={{ mb: 2 }}>
              Para que los cambios tengan efecto, es necesario cerrar sesión y
              volver a iniciarla.
            </Alert>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        {hasChanges && (
          <>
            <Button
              onClick={cancelChanges}
              variant='outlined'
              color='secondary'
            >
              Cancelar Cambios
            </Button>
            <Button
              onClick={saveChanges}
              variant='contained'
              startIcon={<Save />}
              disabled={updateRoleMutation.isPending}
            >
              {updateRoleMutation.isPending
                ? 'Guardando...'
                : 'Guardar Cambios'}
            </Button>
          </>
        )}
        <Button
          onClick={onClose}
          variant={hasChanges ? 'outlined' : 'contained'}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
