import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useFormWithSchema } from '@shared/hooks/useFormWithSchema';
import {
  editClientSchema,
  EditClientFormData,
} from '@features/client/schemas/editClientSchema';
import { useUpdateClient } from '@features/client/hooks/useUpdateClient';
import { useClientByDni } from '@features/client/hooks/useClientByDni';
import EditClientHeader from '@features/client/components/EditClientHeader';
import EditClientFormFields from '@features/client/components/EditClientFormFields';
import EditClientActions from '@features/client/components/EditClientActions';
import { useToast } from '@shared/hooks/useToast';
import { createPatchOperations } from '@shared/utils/jsonPatch';
import type { Client } from '@features/client/types/clientTypes';

export default function EditClientPage() {
  const navigate = useNavigate();
  const { dni } = useParams<{ dni: string }>();
  const updateClientMutation = useUpdateClient();
  const { showToast } = useToast();

  const { data, isLoading, error } = useClientByDni(dni ? Number(dni) : undefined);

  const client: Client | null = useMemo(() => {
    const clientData = data?.data;
    if (clientData) {
      return {
        id: clientData.id,
        dni: clientData.dni,
        firstName: clientData.firstName,
        address: clientData.address,
      };
    }
    return null;
  }, [data]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithSchema<EditClientFormData>({
    schema: editClientSchema,
    defaultValues: {
      dni: '' as any,
      firstName: '',
      address: '',
    },
  });

  useEffect(() => {
    if (client) {
      reset({
        dni: client.dni,
        firstName: client.firstName,
        address: client.address,
      });
    }
  }, [client, reset]);

  useEffect(() => {
    if (!dni) {
      showToast('DNI de cliente no válido', 'error');
      navigate('/entities/clients');
      return;
    }

    if (error) {
      showToast('Error al cargar el cliente', 'error');
      navigate('/entities/clients');
      return;
    }

    if (!isLoading && !client && dni) {
      showToast(`Cliente con DNI "${dni}" no encontrado`, 'error');
      navigate('/entities/clients');
    }
  }, [dni, client, isLoading, error, navigate, showToast]);

  const onSubmit = (data: EditClientFormData) => {
    if (!client) return;

    const updatedClient: Client = {
      ...client,
      ...data,
    };

    const operations = createPatchOperations(
      client,
      updatedClient,
      [],
      true
    );

    if (operations.length === 0) {
      showToast('No hay cambios para guardar', 'info');
      return;
    }

    updateClientMutation.mutate(
      {
        dni: client.dni,
        ops: operations,
      },
      {
        onSuccess: () => {
          navigate('/entities/clients');
        },
      }
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!client && isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Cargando datos del cliente...</Typography>
      </Box>
    );
  }

  if (!client) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <EditClientHeader
        onBack={handleBack}
        clientName={client.firstName}
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
          <EditClientFormFields control={control} />
          <EditClientActions
            onCancel={handleBack}
            isLoading={updateClientMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
