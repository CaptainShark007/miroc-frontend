import { Box, Typography, Button } from '@mui/material';
import { SupervisorAccount, PersonAdd } from '@mui/icons-material';

interface UserAdminHeaderProps {
  onCreateUser?: () => void;
}

export default function UserAdminHeader({
  onCreateUser,
}: UserAdminHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <SupervisorAccount sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant='h4' fontWeight={600}>
          Administrador de Usuarios
        </Typography>
      </Box>

      <Button
        variant='contained'
        startIcon={<PersonAdd />}
        onClick={onCreateUser}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        Crear Usuario
      </Button>
    </Box>
  );
}
