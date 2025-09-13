import React from 'react';
import {
  Box,
  Switch,
  Typography,
  Paper,
  Stack,
  useColorScheme,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light');
  };

  const isDarkMode = mode === 'dark';

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Stack spacing={2}>
        <Typography variant='h6' component='h3' gutterBottom>
          Tema de la aplicación
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          Selecciona el tema que prefieras para la interfaz
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            backgroundColor: 'action.hover',
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon
              color={!isDarkMode ? 'primary' : 'disabled'}
              sx={{ fontSize: 20 }}
            />
            <Typography
              variant='body2'
              color={!isDarkMode ? 'primary' : 'text.secondary'}
              sx={{ fontWeight: !isDarkMode ? 'bold' : 'normal' }}
            >
              Claro
            </Typography>
          </Box>

          <Switch
            checked={isDarkMode}
            onChange={handleThemeChange}
            color='primary'
            sx={{
              '& .MuiSwitch-thumb': {
                backgroundColor: isDarkMode ? 'grey.800' : 'common.white',
              },
              '& .MuiSwitch-track': {
                backgroundColor: isDarkMode ? 'grey.700' : 'grey.300',
              },
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant='body2'
              color={isDarkMode ? 'primary' : 'text.secondary'}
              sx={{ fontWeight: isDarkMode ? 'bold' : 'normal' }}
            >
              Oscuro
            </Typography>
            <DarkModeIcon
              color={isDarkMode ? 'primary' : 'disabled'}
              sx={{ fontSize: 20 }}
            />
          </Box>
        </Box>

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ fontStyle: 'italic' }}
        >
          El tema se aplicará inmediatamente a toda la aplicación
        </Typography>
      </Stack>
    </Paper>
  );
}
