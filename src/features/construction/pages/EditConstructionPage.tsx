import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useFormWithSchema } from '@shared/hooks/useFormWithSchema';
import {
  editConstructionSchema,
  EditConstructionFormData,
} from '@features/construction/schemas/editConstructionSchema';
import { useUpdateConstruction } from '@features/construction/hooks/useUpdateConstruction';
import { useConstructionByNombre } from '@features/construction/hooks/useConstructionByNombre';
import EditConstructionHeader from '@features/construction/components/EditConstructionHeader';
import EditConstructionFormFields from '@features/construction/components/EditConstructionFormFields';
import EditConstructionActions from '@features/construction/components/EditConstructionActions';
import { useToast } from '@shared/hooks/useToast';
import { createPatchOperations } from '@shared/utils/jsonPatch';
import type { Construction } from '@features/construction/types';

export default function EditConstructionPage() {
  const navigate = useNavigate();
  const { nombre } = useParams<{ nombre: string }>();
  const updateConstructionMutation = useUpdateConstruction();
  const { showToast } = useToast();

  const { data, isLoading, error } = useConstructionByNombre(nombre);

  const construction: Construction | null = useMemo(() => {
    const constructionData = data?.data;
    if (constructionData) {
      return constructionData;
    }
    return null;
  }, [data]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithSchema<EditConstructionFormData>({
    schema: editConstructionSchema,
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      address: '',
      description: '',
      clientDni: undefined,
    },
  });

  useEffect(() => {
    if (construction) {
      reset({
        name: construction.name,
        startDate: construction.startDate,
        endDate: construction.endDate,
        address: construction.address,
        description: construction.description,
        clientDni: construction.clientDni,
      });
    }
  }, [construction, reset]);

  useEffect(() => {
    if (!nombre) {
      showToast('Nombre de obra no válido', 'error');
      navigate('/works');
      return;
    }

    if (error) {
      showToast('Error al cargar la obra', 'error');
      navigate('/works');
      return;
    }

    if (!isLoading && !construction && nombre) {
      showToast(`Obra con nombre "${nombre}" no encontrada`, 'error');
      navigate('/works');
    }
  }, [nombre, construction, isLoading, error, navigate, showToast]);

  const onSubmit = (data: EditConstructionFormData) => {
    if (!construction) return;

    const updatedConstruction: Construction = {
      ...construction,
      ...data,
    };

    const operations = createPatchOperations(
      construction,
      updatedConstruction,
      [],
      true
    );

    if (operations.length === 0) {
      showToast('No hay cambios para guardar', 'info');
      return;
    }

    updateConstructionMutation.mutate(
      {
        name: construction.name,
        ops: operations,
      },
      {
        onSuccess: () => {
          navigate('/works');
        },
      }
    );
  };

  const handleBack = () => {
    navigate('/works');
  };

  if (!construction && isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Cargando datos de la obra...</Typography>
      </Box>
    );
  }

  if (!construction) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <EditConstructionHeader
        onBack={handleBack}
        constructionName={construction.name}
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
          <EditConstructionFormFields control={control} />
          <EditConstructionActions
            onCancel={handleBack}
            isLoading={updateConstructionMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
