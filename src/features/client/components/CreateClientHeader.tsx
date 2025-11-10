import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface CreateClientHeaderProps {
  onBack: () => void;
}

export default function CreateClientHeader({
  onBack,
}: CreateClientHeaderProps) {
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
        Crear Cliente
      </Typography>
    </Box>
  );
}
