import { Control } from 'react-hook-form';
import { FormTextField } from '@/shared/components/FormTextField';
import { EditProviderFormData } from '@/features/provider/schemas/editProviderSchema';

interface EditProviderFormFieldsProps {
  control: Control<EditProviderFormData>;
}

export default function EditProviderFormFields({
  control,
}: EditProviderFormFieldsProps) {
  return (
    <>
      <FormTextField name='cuit' control={control} label='CUIT *' type='number' disabled />

      <FormTextField name='firstName' control={control} label='Nombre *' />

      <FormTextField name='address' control={control} label='Dirección' />
      <FormTextField name='description' control={control} label='Descripción' />
    </>
  );
}
