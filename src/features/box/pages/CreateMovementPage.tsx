import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useFormWithSchema } from '@shared/hooks/useFormWithSchema';
import {
  createMovementSchema,
  CreateMovementFormData,
} from '@features/box/schemas/createMovementSchema';
import { useCreateMovement } from '@features/box/hooks/useCreateMovement';
import CreateMovementHeader from '@features/box/components/CreateMovementHeader';
import CreateMovementFormFields from '@features/box/components/CreateMovementFormFields';
import CreateMovementActions from '@features/box/components/CreateMovementActions';
import { PaymentMethod } from '@features/box/types';

export default function CreateMovementPage() {
  const navigate = useNavigate();
  const createMovementMutation = useCreateMovement();

  const {
    control,
    handleSubmit,
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

  const onSubmit = (data: CreateMovementFormData) => {
    createMovementMutation.mutate(data, {
      onSuccess: () => {
        navigate('/movements');
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ p: 3, height: 'calc(100vh - 64px)', overflow: 'auto' }}>
      <CreateMovementHeader onBack={handleBack} />

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
          <CreateMovementFormFields control={control} setValue={setValue} />
          <CreateMovementActions
            onCancel={handleBack}
            isLoading={createMovementMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
