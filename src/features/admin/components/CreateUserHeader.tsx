import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack, PersonAdd } from '@mui/icons-material';

interface CreateUserHeaderProps {
  onBack: () => void;
}

export default function CreateUserHeader({ onBack }: CreateUserHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <IconButton
        onClick={onBack}
        sx={{
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <ArrowBack />
      </IconButton>
      <PersonAdd sx={{ fontSize: 32, color: 'primary.main' }} />
      <Typography variant='h4' fontWeight={600}>
        Crear Nuevo Usuario
      </Typography>
    </Box>
  );
}
