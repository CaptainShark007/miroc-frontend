import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useFormWithSchema } from '@shared/hooks/useFormWithSchema';
import {
  createConstructionSchema,
  CreateConstructionFormData,
} from '@features/construction/schemas/createConstructionSchema';
import { useCreateConstruction } from '@features/construction/hooks/useCreateConstruction';
import CreateConstructionHeader from '@features/construction/components/CreateConstructionHeader';
import CreateConstructionFormFields from '@features/construction/components/CreateConstructionFormFields';
import CreateConstructionActions from '@features/construction/components/CreateConstructionActions';
export default function CreateConstructionPage() {
  const navigate = useNavigate();
  const createConstructionMutation = useCreateConstruction();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormWithSchema<CreateConstructionFormData>({
    schema: createConstructionSchema,
    defaultValues: {
      name: '',
      startDate: '',
      endDate: null,
      address: '',
      description: '',
      clientDni: undefined,
    },
  });

  const onSubmit = (data: CreateConstructionFormData) => {
    createConstructionMutation.mutate(
      {
        ...data,
        endDate: data.endDate || null,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <CreateConstructionHeader onBack={handleBack} />

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
          <CreateConstructionFormFields control={control} />
          <CreateConstructionActions
            onCancel={handleBack}
            isLoading={createConstructionMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
