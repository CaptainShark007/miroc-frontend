import { Box, Typography, useTheme } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

interface LoginHeaderProps {
  title?: string;
  subtitle?: string;
}

export const LoginHeader = ({
  title = 'Iniciar Sesión',
  subtitle = 'Ingresa tus credenciales para acceder',
}: LoginHeaderProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <AccountCircle sx={{ fontSize: 48, color: 'white' }} />
      </Box>

      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 1,
        }}
      >
        {title}
      </Typography>

      <Typography variant='body1' color='text.secondary' sx={{ maxWidth: 400 }}>
        {subtitle}
      </Typography>
    </Box>
  );
};
