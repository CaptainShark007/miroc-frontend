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

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const updateUserMutation = useUpdateUser();
  const { showToast } = useToast();

  const { user, isLoading, error } = useUserById(id);

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
    if (!id) {
      showToast('ID de usuario no válido', 'error');
      navigate('/admin/users');
      return;
    }

    if (error) {
      showToast('Error al cargar el usuario', 'error');
      navigate('/admin/users');
      return;
    }

    if (!isLoading && !user && id) {
      showToast(`Usuario con ID "${id}" no encontrado`, 'error');
      navigate('/admin/users');
    }
  }, [id, user, isLoading, error, navigate, showToast]);

  const onSubmit = (data: EditUserFormData) => {
    if (!user) return;

    const updateData: Partial<EditUserFormData> = {
      dni: data.dni,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };

    if (data.password && data.password.trim() !== '') {
      updateData.password = data.password;
    }

    updateUserMutation.mutate(
      {
        userId: user.dni,
        data: updateData,
      },
      {
        onSuccess: () => {
          navigate('/admin/users');
        },
      }
    );
  };

  const handleBack = () => {
    navigate('/admin/users');
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
          <EditUserFormFields control={control} />
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
