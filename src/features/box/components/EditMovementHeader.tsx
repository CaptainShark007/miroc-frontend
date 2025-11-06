import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';

interface EditMovementHeaderProps {
  onBack: () => void;
  movementCode?: number;
}

export default function EditMovementHeader({
  onBack,
  movementCode,
}: EditMovementHeaderProps) {
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
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <ArrowBack />
      </IconButton>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Edit sx={{ fontSize: 32, color: 'primary.main' }} />
        <Box>
          <Typography variant='h4' fontWeight={600}>
            Editar Movimiento
          </Typography>
          {movementCode && (
            <Typography variant='body2' color='text.secondary'>
              Código: #{movementCode}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
