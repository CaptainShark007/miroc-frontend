import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useFormWithSchema } from '@/shared/hooks/useFormWithSchema';
import {
  editProviderSchema,
  EditProviderFormData,
} from '@/features/provider/schemas/editProviderSchema';
import { useUpdateProvider } from '@/features/provider/hooks/useUpdateProvider';
import { useProviderByCuit } from '@features/provider/hooks/useProviderByCuit';
import EditProviderHeader from '@/features/provider/components/EditProviderHeader';
import EditProviderFormFields from '@/features/provider/components/EditProviderFormFields';
import EditProviderActions from '@/features/provider/components/EditProviderActions';
import { useToast } from '@/shared/hooks/useToast';

export default function EditProviderPage() {
  const navigate = useNavigate();
  const { cuit } = useParams<{ cuit: string }>();
  const cuitNumber = cuit ? Number(cuit) : undefined;
  const updateProviderMutation = useUpdateProvider();
  const { showToast } = useToast();

  const { provider, isLoading, error } = useProviderByCuit(cuitNumber);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithSchema<EditProviderFormData>({
    schema: editProviderSchema,
    defaultValues: {
      cuit: undefined,
      firstName: '',
      address: '',
      description: '',
    },
  });

  useEffect(() => {
    if (provider) {
      reset({
        cuit: provider.cuit,
        firstName: provider.firstName,
        address: provider.address,
        description: provider.description
      });
    }
  }, [provider, reset]);

  useEffect(() => {
    if (!cuit) {
      showToast('CUIT del proveedor no válido', 'error');
      navigate('/entities/suppliers');
      return;
    }

    if (error) {
      showToast('Error al cargar el proveedor', 'error');
      navigate('/entities/suppliers');
      return;
    }

    if (!isLoading && !provider && cuit) {
      showToast(`Proveedor con CUIT "${cuit}" no encontrado`, 'error');
      navigate('/entities/suppliers');
    }
  }, [cuit, provider, isLoading, error, navigate, showToast]);

  const onSubmit = (data: EditProviderFormData) => {
    if (!provider) return;

    const updateData: Partial<EditProviderFormData> = {
      cuit: data.cuit,
      firstName: data.firstName,
      address: data.address,
      description: data.description
    };

    updateProviderMutation.mutate(
      {
        providerCuit: provider.cuit,
        data: updateData,
      },
      {
        onSuccess: () => {
          navigate('/entities/suppliers');
        },
      }
    );
  };

  const handleBack = () => {
    navigate('/entities/suppliers');
  };

  if (!provider && isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Cargando datos del proveedor...</Typography>
      </Box>
    );
  }

  if (!provider) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <EditProviderHeader
        onBack={handleBack}
        providerName={`${provider.firstName}`}
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
          <EditProviderFormFields control={control} />
          <EditProviderActions
            onCancel={handleBack}
            isLoading={updateProviderMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
