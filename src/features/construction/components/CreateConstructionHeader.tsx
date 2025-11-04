import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface CreateConstructionHeaderProps {
  onBack: () => void;
}

export default function CreateConstructionHeader({
  onBack,
}: CreateConstructionHeaderProps) {
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
        Crear Obra
      </Typography>
    </Box>
  );
}
