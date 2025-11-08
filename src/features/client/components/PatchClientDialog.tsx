import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Client, PatchOperation } from '../types/clientTypes';

interface PatchClientDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (operations: PatchOperation[]) => void;
  client: Client | null;
  isSubmitting: boolean;
}

export const PatchClientDialog = ({
  open,
  onClose,
  onSubmit,
  client,
  isSubmitting,
}: PatchClientDialogProps) => {
  const [field, setField] = useState<'firstName' | 'address'>('firstName');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (client) {
      setValue(client.firstName);
    }
  }, [client]);

  const handleFieldChange = (newField: 'firstName' | 'address') => {
    setField(newField);
    if (client) {
      setValue(newField === 'firstName' ? client.firstName : client.address);
    }
  };

  const handleSubmit = () => {
    const operations: PatchOperation[] = [
      {
        op: 'replace',
        path: `/${field}`,
        value: value,
      },
    ];
    onSubmit(operations);
  };

  const handleClose = () => {
    onClose();
  };

  const handleExited = () => {
    // Limpiar el estado después de que el diálogo se haya cerrado completamente
    setField('firstName');
    setValue('');
  };

  // Solo renderizar el contenido del diálogo si está abierto y el cliente existe
  if (!open || !client) {
    return null;
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      disableRestoreFocus
      keepMounted={false}
      TransitionProps={{
        onExited: handleExited,
      }}
    >
      <DialogTitle>Actualizar Campo - {client.firstName}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <FormControl fullWidth>
            <InputLabel>Campo a actualizar</InputLabel>
            <Select
              value={field}
              label="Campo a actualizar"
              onChange={(e) =>
                handleFieldChange(e.target.value as 'firstName' | 'address')
              }
            >
              <MenuItem value="firstName">Nombre</MenuItem>
              <MenuItem value="address">Dirección</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label={field === 'firstName' ? 'Nombre' : 'Dirección'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            multiline={field === 'address'}
            rows={field === 'address' ? 2 : 1}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting || !value.trim()}
        >
          {isSubmitting ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
