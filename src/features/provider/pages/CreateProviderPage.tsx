import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useFormWithSchema } from '@/shared/hooks/useFormWithSchema';
import {
  createProviderSchema,
  CreateProviderFormData,
} from '@/features/provider/schemas/createProviderSchema';
import { useCreateProvider } from '@/features/provider/hooks/useCreateProvider';
import CreateProviderHeader from '@/features/provider/components/CreateProviderHeader';
import CreateProviderFormFields from '@/features/provider/components/CreateProviderFormFields';
import CreateProviderActions from '@/features/provider/components/CreateProviderActions';

export default function CreateProviderPage() {
  const navigate = useNavigate();
  const createProviderMutation = useCreateProvider();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormWithSchema<CreateProviderFormData>({
    schema: createProviderSchema,
    defaultValues: {
      cuit: undefined,
      firstName: '',
      address: '',
      description: '',
    },
  });

  const onSubmit = (data: CreateProviderFormData) => {
    createProviderMutation.mutate(data, {
      onSuccess: () => {
        navigate('/entities/suppliers');
      },
    });
  };

  const handleBack = () => {
    navigate('/entities/suppliers');
  };

  return (
    <Box sx={{ p: 3 }}>
      <CreateProviderHeader onBack={handleBack} />

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
          <CreateProviderFormFields control={control} />
          <CreateProviderActions
            onCancel={handleBack}
            isLoading={createProviderMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
