import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useFormWithSchema } from '@shared/hooks/useFormWithSchema';
import {
  createClientSchema,
  CreateClientFormData,
} from '@features/client/schemas/createClientSchema';
import { useCreateClient } from '@features/client/hooks/useClients';
import { useToast } from '@shared/hooks/useToast';
import CreateClientHeader from '@features/client/components/CreateClientHeader';
import CreateClientFormFields from '@features/client/components/CreateClientFormFields';
import CreateClientActions from '@features/client/components/CreateClientActions';

export default function CreateClientPage() {
  const navigate = useNavigate();
  const createClientMutation = useCreateClient();
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormWithSchema<CreateClientFormData>({
    schema: createClientSchema,
    defaultValues: {
      dni: '' as any,
      firstName: '',
      address: '',
    },
  });

  const onSubmit = (data: CreateClientFormData) => {
    createClientMutation.mutate(data, {
      onSuccess: () => {
        showToast('Cliente creado correctamente', 'success');
        navigate(-1);
      },
      onError: (error: any) => {
        showToast(
          error?.response?.data?.message || 'Error al crear el cliente',
          'error'
        );
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <CreateClientHeader onBack={handleBack} />

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
          <CreateClientFormFields control={control} />
          <CreateClientActions
            onCancel={handleBack}
            isLoading={createClientMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
