import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface CreateEmployeeHeaderProps {
  onBack: () => void;
}

export default function CreateEmployeeHeader({
  onBack,
}: CreateEmployeeHeaderProps) {
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
        Crear Empleado
      </Typography>
    </Box>
  );
}
