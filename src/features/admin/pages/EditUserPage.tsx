import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useFormWithSchema } from '@shared/hooks/useFormWithSchema';
import {
  editUserSchema,
  EditUserFormData,
} from '@features/admin/schemas/editUserSchema';
import { useUpdateUser } from '@features/admin/hooks/useUpdateUser';
import { useUserById } from '@features/admin/hooks/useUserById';
import EditUserHeader from '@features/admin/components/EditUserHeader';
import EditUserFormFields from '@features/admin/components/EditUserFormFields';
import EditUserActions from '@features/admin/components/EditUserActions';
import { useToast } from '@shared/hooks/useToast';
import { createPatchOperations } from '@shared/utils/jsonPatch';
import type { User } from '@features/admin/types';

export default function EditUserPage() {
  const navigate = useNavigate();
  const { dni } = useParams<{ dni: string }>();
  const updateUserMutation = useUpdateUser();
  const { showToast } = useToast();

  const { user, isLoading, error } = useUserById(dni);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithSchema<EditUserFormData>({
    schema: editUserSchema,
    defaultValues: {
      dni: undefined,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'PRESUPUESTISTA',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        dni: user.dni,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        password: '',
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (!dni) {
      showToast('DNI de usuario no válido', 'error');
      navigate('/admin/users');
      return;
    }

    if (error) {
      showToast('Error al cargar el usuario', 'error');
      navigate('/admin/users');
      return;
    }

    if (!isLoading && !user && dni) {
      showToast(`Usuario con DNI "${dni}" no encontrado`, 'error');
      navigate('/admin/users');
    }
  }, [dni, user, isLoading, error, navigate, showToast]);

  const onSubmit = (data: EditUserFormData) => {
    if (!user) return;

    // Crear el objeto actualizado combinando usuario actual con datos del formulario
    const updatedUser: User = {
      ...user,
      ...data,
    };

    const operations = createPatchOperations(
      user,
      updatedUser,
      ['id', 'status'] // Excluir campos que no se deben actualizar
    );

    if (operations.length === 0) {
      showToast('No hay cambios para guardar', 'info');
      return;
    }

    updateUserMutation.mutate(
      {
        dni: user.dni,
        ops: operations,
      },
      {
        onSuccess: () => {
          navigate('/admin/users');
        },
      }
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!user && isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Cargando datos del usuario...</Typography>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <EditUserHeader
        onBack={handleBack}
        userName={`${user.firstName} ${user.lastName}`}
      />

      <Paper
        sx={{
          p: 4,
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <EditUserFormFields control={control} user={user} />
          <EditUserActions
            onCancel={handleBack}
            isLoading={updateUserMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
