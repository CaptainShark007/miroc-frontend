import { Box, Button, Typography } from '@mui/material';
import { LoadingButton } from '@/shared/components/LoadingButton';

interface CreateProviderActionsProps {
    onCancel: () => void;
    isLoading: boolean;
    isValid: boolean;
}

export default function CreateProviderActions({
    onCancel,
    isLoading,
    isValid,
}: CreateProviderActionsProps) {
    return (
    <>
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{
          gridColumn: '1 / -1',
          mt: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Box component='span' sx={{ color: 'error.main' }}>
          *
        </Box>
        Campos obligatorios
      </Typography>

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
          Crear Proveedor
        </LoadingButton>
      </Box>
    </>
  );
}