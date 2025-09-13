import { Container, Typography, Box, Stack } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import ThemeToggle from '../components/ThemeToggle';

export default function ConfigurationPage() {
  return (
    <Container maxWidth='md'>
      <Box sx={{ py: 2 }}>
        <Stack direction='row' alignItems='center' spacing={2} sx={{ mb: 4 }}>
          <SettingsIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant='h4' component='h1' gutterBottom>
              Configuración
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Personaliza la aplicación según tus preferencias
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={3}>
          <Box>
            <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 2 }}>
              Apariencia
            </Typography>
            <ThemeToggle />
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ fontStyle: 'italic' }}
            >
              Más opciones de configuración estarán disponibles próximamente...
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
