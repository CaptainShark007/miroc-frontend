import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Client, CreateClientPayload } from '../types/clientTypes';

interface ClientFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClientPayload) => void;
  client?: Client | null;
  isSubmitting: boolean;
}

export const ClientForm = ({
  open,
  onClose,
  onSubmit,
  client,
  isSubmitting,
}: ClientFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientPayload>({
    defaultValues: {
      dni: 0,
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
    } else {
      reset({
        dni: 0,
        firstName: '',
        address: '',
      });
    }
  }, [client, reset]);

  const handleFormSubmit = (data: CreateClientPayload) => {
    onSubmit(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {client ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Controller
              name="dni"
              control={control}
              rules={{
                required: 'El DNI es requerido',
                min: { value: 1, message: 'DNI debe ser mayor a 0' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="DNI"
                  type="number"
                  fullWidth
                  disabled={!!client}
                  error={!!errors.dni}
                  helperText={errors.dni?.message}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: 'El nombre es requerido',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              rules={{
                required: 'La dirección es requerida',
                minLength: {
                  value: 5,
                  message: 'La dirección debe tener al menos 5 caracteres',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Dirección"
                  fullWidth
                  multiline
                  rows={2}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {client ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
