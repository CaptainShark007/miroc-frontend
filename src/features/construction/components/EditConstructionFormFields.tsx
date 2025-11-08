import { Control } from 'react-hook-form';
import { FormTextField } from '@shared/components/FormTextField';
import { EditConstructionFormData } from '@features/construction/schemas/editConstructionSchema';

interface EditConstructionFormFieldsProps {
  control: Control<EditConstructionFormData>;
}

export default function EditConstructionFormFields({
  control,
}: EditConstructionFormFieldsProps) {
  return (
    <>
      <FormTextField
        name='startDate'
        control={control}
        label='Fecha de Inicio'
        type='date'
      />
      <FormTextField
        name='endDate'
        control={control}
        label='Fecha de Fin'
        type='date'
      />
      <FormTextField name='address' control={control} label='Ubicación' />
      <FormTextField
        name='description'
        control={control}
        label='Descripción'
        multiline
        maxRows={4}
      />
      <FormTextField
        name='clientDni'
        control={control}
        label='DNI Cliente'
        type='number'
      />
    </>
  );
}
