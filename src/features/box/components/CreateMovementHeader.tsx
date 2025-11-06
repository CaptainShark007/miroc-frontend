import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface CreateMovementHeaderProps {
  onBack: () => void;
}

export default function CreateMovementHeader({
  onBack,
}: CreateMovementHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <IconButton onClick={onBack} sx={{ color: 'primary.main' }}>
        <ArrowBack />
      </IconButton>
      <Typography variant='h4' fontWeight={600}>
        Crear Movimiento
      </Typography>
    </Box>
  );
}
