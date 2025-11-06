import { Box } from '@mui/material';
import { LoadingButton } from '@shared/components/LoadingButton';

interface EditMovementActionsProps {
  onCancel: () => void;
  isLoading: boolean;
  isValid: boolean;
}

export default function EditMovementActions({
  onCancel,
  isLoading,
  isValid,
}: EditMovementActionsProps) {
  return (
    <Box
      sx={{
        gridColumn: '1 / -1',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        pt: 2,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <LoadingButton
        variant='outlined'
        onClick={onCancel}
        disabled={isLoading}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          minWidth: 120,
        }}
      >
        Cancelar
      </LoadingButton>

      <LoadingButton
        variant='contained'
        type='submit'
        loading={isLoading}
        disabled={!isValid}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
          minWidth: 120,
        }}
      >
        Actualizar
      </LoadingButton>
    </Box>
  );
}
