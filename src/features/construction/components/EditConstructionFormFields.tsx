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
        name='name'
        control={control}
        label='Nombre de la Obra *'
        disabled
      />
      <FormTextField
        name='startDate'
        control={control}
        label='Fecha de Inicio de la Obra *'
        type='date'
        InputLabelProps={{ shrink: true }}
      />
      <FormTextField
        name='endDate'
        control={control}
        label='Fecha de Finalización de la Obra *'
        type='date'
        InputLabelProps={{ shrink: true }}
      />
      <FormTextField
        name='address'
        control={control}
        label='Dirección de la Obra *'
      />
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
        label='DNI Cliente *'
        type='number'
      />
    </>
  );
}
