import { Control } from 'react-hook-form';
import { FormTextField } from '@shared/components/FormTextField';
import { FormPasswordField } from '@shared/components/FormPasswordField';
import { FormSelectField } from '@shared/components/FormSelectField';
import { CreateUserFormData } from '@features/admin/schemas/createUserSchema';

interface CreateUserFormFieldsProps {
  control: Control<CreateUserFormData>;
}

const userRoles = [{ value: 'PRESUPUESTISTA', label: 'Presupuestista' }];

export default function CreateUserFormFields({
  control,
}: CreateUserFormFieldsProps) {
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

      <FormPasswordField
        name='password'
        control={control}
        label='Contraseña *'
      />

      <FormSelectField
        name='role'
        control={control}
        label='Rol *'
        options={userRoles}
      />
    </>
  );
}
