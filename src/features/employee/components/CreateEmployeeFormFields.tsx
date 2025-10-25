import { Control } from 'react-hook-form';
import { FormTextField } from '@shared/components/FormTextField';
import { CreateEmployeeFormData } from '@features/employee/schemas/createEmployeeSchema';

interface CreateEmployeeFormFieldsProps {
  control: Control<CreateEmployeeFormData>;
}

export default function CreateEmployeeFormFields({
  control,
}: CreateEmployeeFormFieldsProps) {
  return (
    <>
      <FormTextField name='dni' control={control} label='DNI *' type='number' />

      <FormTextField name='firstName' control={control} label='Nombre *' />

      <FormTextField name='lastName' control={control} label='Apellido *' />

      <FormTextField
        name='workStation'
        control={control}
        label='Puesto de Trabajo *'
      />
    </>
  );
}
