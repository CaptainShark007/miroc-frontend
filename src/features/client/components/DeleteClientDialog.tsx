import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';
import { Client } from '../types/clientTypes';

interface DeleteClientDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (permanent: boolean) => void;
  client: Client | null;
  isDeleting: boolean;
}

export const DeleteClientDialog = ({
  open,
  onClose,
  onConfirm,
  client,
  isDeleting,
}: DeleteClientDialogProps) => {
  const [permanent, setPermanent] = useState(false);

  const handleConfirm = () => {
    onConfirm(permanent);
    setPermanent(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleExited = () => {
    setPermanent(false);
  };

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
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Está seguro que desea eliminar al cliente{' '}
          <strong>{client.firstName}</strong> (DNI: {client.dni})?
        </DialogContentText>
        <FormControlLabel
          control={
            <Checkbox
              checked={permanent}
              onChange={(e) => setPermanent(e.target.checked)}
              color="error"
            />
          }
          label="Eliminación permanente (no se puede recuperar)"
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isDeleting}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={isDeleting}
        >
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
