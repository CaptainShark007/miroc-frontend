import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useFormWithSchema } from '@shared/hooks/useFormWithSchema';
import {
  createMovementSchema,
  CreateMovementFormData,
} from '@features/box/schemas/createMovementSchema';
import { useUpdateMovement } from '@features/box/hooks/useUpdateMovement';
import { useMovementByCode } from '@features/box/hooks/useMovementByCode';
import EditMovementHeader from '@features/box/components/EditMovementHeader';
import EditMovementFormFields from '@features/box/components/EditMovementFormFields';
import EditMovementActions from '@features/box/components/EditMovementActions';
import { useToast } from '@shared/hooks/useToast';
import { PaymentMethod } from '@features/box/types';

export default function EditMovementPage() {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const updateMovementMutation = useUpdateMovement();
  const { showToast } = useToast();

  const { data, isLoading, error } = useMovementByCode(code);

  const movement = data?.data;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
  } = useFormWithSchema<CreateMovementFormData>({
    schema: createMovementSchema,
    defaultValues: {
      amount: 0,
      paymentMethod: PaymentMethod.CASH,
      conceptId: undefined,
      clientId: null,
      providerId: null,
      employeeId: null,
      constructionId: null,
    },
  });

  useEffect(() => {
    if (movement) {
      const entityId =
        movement.associatedEntity?.type === 'CLIENTE'
          ? movement.associatedEntity.id
          : null;
      const providerId =
        movement.associatedEntity?.type === 'PROVEEDOR'
          ? movement.associatedEntity.id
          : null;
      const employeeId =
        movement.associatedEntity?.type === 'EMPLEADO'
          ? movement.associatedEntity.id
          : null;
      const constructionId =
        movement.associatedEntity?.type === 'OBRA'
          ? movement.associatedEntity.id
          : null;

      reset({
        amount: movement.amount,
        paymentMethod: movement.paymentMethod as PaymentMethod,
        conceptId: (movement as any).conceptId || undefined,
        clientId: entityId,
        providerId: providerId,
        employeeId: employeeId,
        constructionId: constructionId,
      });
    }
  }, [movement, reset]);

  useEffect(() => {
    if (!code) {
      showToast('Código de movimiento no válido', 'error');
      navigate('/movements');
      return;
    }

    if (error) {
      showToast('Error al cargar el movimiento', 'error');
      navigate('/movements');
      return;
    }

    if (!isLoading && !movement && code) {
      showToast(`Movimiento con código "${code}" no encontrado`, 'error');
      navigate('/movements');
    }
  }, [code, movement, isLoading, error, navigate, showToast]);

  const onSubmit = (data: CreateMovementFormData) => {
    if (!movement) return;

    updateMovementMutation.mutate(
      {
        code: movement.codeMovement,
        data: {
          amount: data.amount,
          paymentMethod: data.paymentMethod,
          conceptId: data.conceptId!,
          clientId: data.clientId,
          providerId: data.providerId,
          employeeId: data.employeeId,
          constructionId: data.constructionId,
        },
      },
      {
        onSuccess: () => {
          navigate('/movements');
        },
      }
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!movement && isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Cargando datos del movimiento...</Typography>
      </Box>
    );
  }

  if (!movement) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <EditMovementHeader
        onBack={handleBack}
        movementCode={movement.codeMovement}
      />

      <Paper
        sx={{
          p: 4,
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <EditMovementFormFields control={control} setValue={setValue} />
          <EditMovementActions
            onCancel={handleBack}
            isLoading={updateMovementMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
