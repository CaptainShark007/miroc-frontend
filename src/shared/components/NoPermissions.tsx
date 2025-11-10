import { Box, Typography, Button, Paper } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface NoPermissionsProps {
  moduleName?: string;
}

export default function NoPermissions({ moduleName }: NoPermissionsProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)',
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 6,
          textAlign: 'center',
          maxWidth: 500,
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'error.lighter',
            mb: 3,
          }}
        >
          <Lock sx={{ fontSize: 48, color: 'error.main' }} />
        </Box>

        <Typography variant='h4' fontWeight={600} gutterBottom>
          Acceso Denegado
        </Typography>

        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ mb: 4, lineHeight: 1.7 }}
        >
          {moduleName
            ? `No tienes permisos para acceder al módulo de ${moduleName}.`
            : 'No tienes permisos para acceder a esta sección.'}
          <br />
          Por favor, contacta al administrador del sistema si necesitas acceso.
        </Typography>

        <Button
          variant='contained'
          onClick={() => navigate('/movements')}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
          }}
        >
          Volver al Panel
        </Button>
      </Paper>
    </Box>
  );
}
