import { Control } from 'react-hook-form';
import { FormTextField } from '@shared/components/FormTextField';
import { EditEmployeeFormData } from '@features/employee/schemas/editEmployeeSchema';

interface EditEmployeeFormFieldsProps {
  control: Control<EditEmployeeFormData>;
}

export default function EditEmployeeFormFields({
  control,
}: EditEmployeeFormFieldsProps) {
  return (
    <>
      <FormTextField
        name='dni'
        control={control}
        label='DNI *'
        type='number'
        disabled
      />

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
