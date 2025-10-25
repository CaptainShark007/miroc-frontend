import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface EditEmployeeHeaderProps {
  onBack: () => void;
  employeeName: string;
}

export default function EditEmployeeHeader({
  onBack,
  employeeName,
}: EditEmployeeHeaderProps) {
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
          Editar Empleado
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {employeeName}
        </Typography>
      </Box>
    </Box>
  );
}
