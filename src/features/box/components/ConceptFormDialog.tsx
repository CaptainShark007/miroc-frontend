import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { Close, Category } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormTextField } from '@shared/components/FormTextField';
import { FormSelectField } from '@shared/components/FormSelectField';
import { useCreateConcept } from '@features/box/hooks/useCreateConcept';
import { useUpdateConcept } from '@features/box/hooks/useUpdateConcept';
import { useToast } from '@shared/hooks/useToast';
import {
  conceptSchema,
  ConceptFormData,
} from '@features/box/schemas/conceptSchema';
import { Concept } from '@features/box/types';

interface ConceptFormDialogProps {
  open: boolean;
  onClose: () => void;
  concept?: Concept | null;
}

const typeOptions = [
  { value: 'ingreso', label: 'Ingreso' },
  { value: 'egreso', label: 'Egreso' },
];

export default function ConceptFormDialog({
  open,
  onClose,
  concept,
}: ConceptFormDialogProps) {
  const { showToast } = useToast();
  const createMutation = useCreateConcept();
  const updateMutation = useUpdateConcept();

  const { control, handleSubmit, reset } = useForm<ConceptFormData>({
    resolver: yupResolver(conceptSchema),
    defaultValues: {
      name: '',
      type: 'ingreso',
    },
  });

  useEffect(() => {
    if (concept) {
      reset({
        name: concept.name,
        type: concept.type,
      });
    } else {
      reset({
        name: '',
        type: 'ingreso',
      });
    }
  }, [concept, reset, open]);

  const onSubmit = async (data: ConceptFormData) => {
    try {
      if (concept) {
        await updateMutation.mutateAsync({
          id: concept.id,
          data: {
            name: data.name,
            type: data.type,
            description: '',
          },
        });
        showToast('Concepto actualizado exitosamente', 'success');
      } else {
        await createMutation.mutateAsync({
          name: data.name,
          type: data.type,
          description: '',
        });
        showToast('Concepto creado exitosamente', 'success');
      }
      onClose();
      reset();
    } catch {
      showToast(
        `Error al ${concept ? 'actualizar' : 'crear'} el concepto`,
        'error'
      );
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Category color='primary' />
          <Typography variant='h6' fontWeight={600}>
            {concept ? 'Editar Concepto' : 'Crear Concepto'}
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size='small'>
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormTextField
              name='name'
              control={control}
              label='Nombre *'
              placeholder='Ej: Venta de productos'
            />

            <FormSelectField
              name='type'
              control={control}
              label='Tipo *'
              options={typeOptions}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleClose}
            variant='outlined'
            disabled={isLoading}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={isLoading}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {isLoading ? 'Guardando...' : concept ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
