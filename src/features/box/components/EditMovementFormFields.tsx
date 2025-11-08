import { useState } from 'react';
import { Control, useWatch, UseFormSetValue } from 'react-hook-form';
import { Box, Typography, Chip } from '@mui/material';
import { FormTextField } from '@shared/components/FormTextField';
import { FormSelectField } from '@shared/components/FormSelectField';
import { FormAutocomplete } from '@shared/components/FormAutocomplete';
import { CreateMovementFormData } from '@features/box/schemas/createMovementSchema';
import { PaymentMethod, Concept } from '@features/box/types';
import { getConcepts } from '@features/box/api/service';
import ConceptFormDialog from '@features/box/components/ConceptFormDialog';

interface EditMovementFormFieldsProps {
  control: Control<CreateMovementFormData>;
  setValue: UseFormSetValue<CreateMovementFormData>;
}

const paymentMethodOptions = [
  { value: PaymentMethod.CASH, label: 'Efectivo' },
  { value: PaymentMethod.CREDIT_CARD, label: 'Tarjeta de Crédito' },
  { value: PaymentMethod.DEBIT_CARD, label: 'Tarjeta de Débito' },
  { value: PaymentMethod.BANK_TRANSFER, label: 'Transferencia Bancaria' },
  { value: PaymentMethod.PAYPAL, label: 'PayPal' },
  { value: PaymentMethod.MOBILE_PAYMENT, label: 'Pago Móvil' },
];

const entityConfigs = {
  client: {
    endpoint: '/api/v1/clients',
    idField: 'dni',
    labelFields: ['firstName', 'lastName', 'dni'],
    searchParam: 'q',
  },
  provider: {
    endpoint: '/api/v1/providers',
    idField: 'cuit',
    labelFields: ['firstName', 'lastName'],
    searchParam: 'q',
  },
  employee: {
    endpoint: '/api/v1/employees',
    idField: 'dni',
    labelFields: ['firstName', 'lastName', 'dni'],
    searchParam: 'q',
  },
  construction: {
    endpoint: '/api/v1/constructions',
    idField: 'constructionId',
    labelFields: ['name'],
    searchParam: 'q',
  },
};

export default function EditMovementFormFields({
  control,
  setValue,
}: EditMovementFormFieldsProps) {
  const [conceptDialogOpen, setConceptDialogOpen] = useState(false);
  const clientId = useWatch({ control, name: 'clientId' });
  const providerId = useWatch({ control, name: 'providerId' });
  const employeeId = useWatch({ control, name: 'employeeId' });
  const constructionId = useWatch({ control, name: 'constructionId' });

  const handleCreateConcept = () => {
    setConceptDialogOpen(true);
  };

  const handleCloseConceptDialog = () => {
    setConceptDialogOpen(false);
  };

  return (
    <>
      <FormTextField
        name='amount'
        control={control}
        label='Monto *'
        type='number'
      />

      <FormSelectField
        name='paymentMethod'
        control={control}
        label='Método de Pago *'
        options={paymentMethodOptions}
      />

      <FormAutocomplete
        name='conceptId'
        control={control}
        label='Concepto'
        required
        entityConfig={{
          endpoint: '/api/v1/concepts',
          idField: 'id',
          labelFields: ['name'],
          searchParam: 'q',
          customFetch: (searchQuery: string) =>
            getConcepts({
              q: searchQuery || undefined,
              pageIndex: 1,
              pageSize: 50,
            }),
          customMapper: (item: Concept) => ({
            id: `concept-${item.id}`,
            label: item.name,
            value: item.id,
            extraData: { type: item.type },
          }),
        }}
        minSearchLength={0}
        debounceTime={300}
        onCreateNew={handleCreateConcept}
        createNewLabel='Crear nuevo concepto'
        renderOptionContent={(option) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <span>{option.label}</span>
            <Chip
              label={
                option.extraData?.type === 'ingreso' ? 'Ingreso' : 'Egreso'
              }
              size='small'
              color={
                option.extraData?.type === 'ingreso' ? 'success' : 'error'
              }
              sx={{ ml: 1, fontWeight: 500 }}
            />
          </div>
        )}
      />

      <Box sx={{ gridColumn: '1 / -1', mt: 2 }}>
        <Typography variant='subtitle1' fontWeight={600} gutterBottom>
          Entidad Asociada (Opcional)
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Selecciona solo una entidad asociada al movimiento
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <FormAutocomplete
            name='clientId'
            control={control}
            label='Cliente'
            entityConfig={entityConfigs.client}
            disabled={!!providerId || !!employeeId || !!constructionId}
            minSearchLength={0}
            debounceTime={300}
            onValueChange={(value) => {
              if (value) {
                setValue('providerId', null);
                setValue('employeeId', null);
                setValue('constructionId', null);
              }
            }}
            createNewLabel='Crear nuevo cliente'
            createNavigationPath='/entities/clients/create'
          />

          <FormAutocomplete
            name='providerId'
            control={control}
            label='Proveedor'
            entityConfig={entityConfigs.provider}
            disabled={!!clientId || !!employeeId || !!constructionId}
            minSearchLength={0}
            debounceTime={300}
            onValueChange={(value) => {
              if (value) {
                setValue('clientId', null);
                setValue('employeeId', null);
                setValue('constructionId', null);
              }
            }}
            createNewLabel='Crear nuevo proveedor'
            createNavigationPath='/entities/suppliers/create'
          />

          <FormAutocomplete
            name='employeeId'
            control={control}
            label='Empleado'
            entityConfig={entityConfigs.employee}
            disabled={!!clientId || !!providerId || !!constructionId}
            minSearchLength={0}
            debounceTime={300}
            onValueChange={(value) => {
              if (value) {
                setValue('clientId', null);
                setValue('providerId', null);
                setValue('constructionId', null);
              }
            }}
            createNewLabel='Crear nuevo empleado'
            createNavigationPath='/entities/employees/create'
          />

          <FormAutocomplete
            name='constructionId'
            control={control}
            label='Obra'
            entityConfig={entityConfigs.construction}
            disabled={!!clientId || !!providerId || !!employeeId}
            minSearchLength={0}
            debounceTime={300}
            onValueChange={(value) => {
              if (value) {
                setValue('clientId', null);
                setValue('providerId', null);
                setValue('employeeId', null);
              }
            }}
            createNewLabel='Crear nueva obra'
            createNavigationPath='/works/create'
          />
        </Box>
      </Box>

      <ConceptFormDialog
        open={conceptDialogOpen}
        onClose={handleCloseConceptDialog}
      />
    </>
  );
}
