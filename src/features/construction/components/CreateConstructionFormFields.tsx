import { Control } from 'react-hook-form';
import { FormTextField } from '@shared/components/FormTextField';
import { CreateConstructionFormData } from '@features/construction/schemas/createConstructionSchema';

interface CreateConstructionFormFieldsProps {
  control: Control<CreateConstructionFormData>;
}

export default function CreateConstructionFormFields({
  control,
}: CreateConstructionFormFieldsProps) {
  return (
    <>
      <FormTextField
        name='name'
        control={control}
        label='Nombre de la Obra *'
      />
      <FormTextField name='startDate' control={control} label='' type='date' />
      <FormTextField name='endDate' control={control} label='' type='date' />
      <FormTextField name='address' control={control} label='Ubicación *' />
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
