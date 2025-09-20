import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useFormWithSchema } from '@/shared/hooks/useFormWithSchema';
import {
  createUserSchema,
  CreateUserFormData,
} from '@/features/admin/schemas/createUserSchema';
import { useCreateUser } from '@/features/admin/hooks/useCreateUser';
import CreateUserHeader from '@/features/admin/components/CreateUserHeader';
import CreateUserFormFields from '@/features/admin/components/CreateUserFormFields';
import CreateUserActions from '@/features/admin/components/CreateUserActions';

export default function CreateUserPage() {
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormWithSchema<CreateUserFormData>({
    schema: createUserSchema,
    defaultValues: {
      dni: undefined,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'PRESUPUESTISTA',
    },
  });

  const onSubmit = (data: CreateUserFormData) => {
    createUserMutation.mutate(data, {
      onSuccess: () => {
        navigate('/admin/users');
      },
    });
  };

  const handleBack = () => {
    navigate('/admin/users');
  };

  return (
    <Box sx={{ p: 3 }}>
      <CreateUserHeader onBack={handleBack} />

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
          <CreateUserFormFields control={control} />
          <CreateUserActions
            onCancel={handleBack}
            isLoading={createUserMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
