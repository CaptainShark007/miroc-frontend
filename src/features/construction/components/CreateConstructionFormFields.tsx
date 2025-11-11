import { Control } from 'react-hook-form';
import { FormTextField } from '@shared/components/FormTextField';
import { FormAutocomplete } from '@shared/components/FormAutocomplete';
import { CreateConstructionFormData } from '@features/construction/schemas/createConstructionSchema';

interface CreateConstructionFormFieldsProps {
  control: Control<CreateConstructionFormData>;
}

const clientConfig = {
  endpoint: '/api/v1/clients',
  idField: 'dni',
  labelFields: ['firstName', 'lastName', 'dni'],
  searchParam: 'q',
};

export default function CreateConstructionFormFields({
  control,
}: CreateConstructionFormFieldsProps) {
  return (
    <>
      <FormTextField
        name='name'
        control={control}
        label='Nombre de la Obra *'
        placeholder='Ej: Casa Rodriguez'
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
        label='Fecha de Finalización de la Obra'
        type='date'
        InputLabelProps={{ shrink: true }}
      />
      <FormTextField
        name='address'
        control={control}
        label='Dirección de la Obra *'
        placeholder='Ej: Av. Libertador 1234'
      />
      <FormTextField
        name='description'
        control={control}
        label='Descripción'
        multiline
        maxRows={4}
      />
      <FormAutocomplete
        name='clientDni'
        control={control}
        label='Cliente *'
        entityConfig={clientConfig}
        minSearchLength={0}
        debounceTime={300}
        createNewLabel='Crear nuevo cliente'
        createNavigationPath='/entities/clients/create'
      />
    </>
  );
}
