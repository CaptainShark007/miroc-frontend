import { Box, Button } from '@mui/material';
import { LoadingButton } from '@shared/components/LoadingButton';

interface CreateEmployeeActionsProps {
  onCancel: () => void;
  isLoading: boolean;
  isValid: boolean;
}

export default function CreateEmployeeActions({
  onCancel,
  isLoading,
  isValid,
}: CreateEmployeeActionsProps) {
  return (
    <Box
      sx={{
        gridColumn: '1 / -1',
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end',
        mt: 2,
      }}
    >
      <Button
        variant='outlined'
        onClick={onCancel}
        disabled={isLoading}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        Cancelar
      </Button>
      <LoadingButton
        type='submit'
        variant='contained'
        loading={isLoading}
        disabled={!isValid}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        Crear Empleado
      </LoadingButton>
    </Box>
  );
}
