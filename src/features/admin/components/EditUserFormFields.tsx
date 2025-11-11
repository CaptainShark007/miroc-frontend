import { Control } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import { FormTextField } from '@shared/components/FormTextField';
import { FormPasswordField } from '@shared/components/FormPasswordField';
import { FormSelectField } from '@shared/components/FormSelectField';
import { EditUserFormData } from '@features/admin/schemas/editUserSchema';
import { User } from '@features/admin/types';

interface EditUserFormFieldsProps {
  control: Control<EditUserFormData>;
  user: User;
}

const userRoles = [{ value: 'PRESUPUESTISTA', label: 'Presupuestista' }];

export default function EditUserFormFields({
  control,
  user,
}: EditUserFormFieldsProps) {
  const isAdmin = user.role.toUpperCase() === 'ADMIN';

  return (
    <>
      <FormTextField name='dni' control={control} label='DNI *' type='number' />

      <FormTextField
        name='email'
        control={control}
        label='Email *'
        type='email'
      />

      <FormTextField name='firstName' control={control} label='Nombre *' />

      <FormTextField name='lastName' control={control} label='Apellido *' />

      <Box>
        <FormPasswordField
          name='password'
          control={control}
          label='Nueva Contraseña'
        />
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ mt: 0.5, display: 'block' }}
        >
          Dejar vacío para mantener la actual
        </Typography>
      </Box>

      <FormSelectField
        name='role'
        control={control}
        label='Rol *'
        options={
          isAdmin ? [{ value: 'ADMIN', label: 'Administrador' }] : userRoles
        }
        disabled={isAdmin}
      />
    </>
  );
}
