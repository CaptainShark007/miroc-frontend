import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useFormWithSchema } from '@shared/hooks/useFormWithSchema';
import {
  createEmployeeSchema,
  CreateEmployeeFormData,
} from '@features/employee/schemas/createEmployeeSchema';
import { useCreateEmployee } from '@features/employee/hooks/useCreateEmployee';
import CreateEmployeeHeader from '@features/employee/components/CreateEmployeeHeader';
import CreateEmployeeFormFields from '@features/employee/components/CreateEmployeeFormFields';
import CreateEmployeeActions from '@features/employee/components/CreateEmployeeActions';

export default function CreateEmployeePage() {
  const navigate = useNavigate();
  const createEmployeeMutation = useCreateEmployee();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormWithSchema<CreateEmployeeFormData>({
    schema: createEmployeeSchema,
    defaultValues: {
      dni: undefined,
      firstName: '',
      lastName: '',
      workStation: '',
    },
  });

  const onSubmit = (data: CreateEmployeeFormData) => {
    createEmployeeMutation.mutate(data, {
      onSuccess: () => {
        navigate('/entities/employees');
      },
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ p: 3 }}>
      <CreateEmployeeHeader onBack={handleBack} />

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
          <CreateEmployeeFormFields control={control} />
          <CreateEmployeeActions
            onCancel={handleBack}
            isLoading={createEmployeeMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
