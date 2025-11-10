import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface EditClientHeaderProps {
  onBack: () => void;
  clientName: string;
}

export default function EditClientHeader({
  onBack,
  clientName,
}: EditClientHeaderProps) {
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
      <Box>
        <Typography variant='h4' fontWeight={600}>
          Editar Cliente
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {clientName}
        </Typography>
      </Box>
    </Box>
  );
}
