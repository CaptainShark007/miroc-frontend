import { Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Movement } from '@features/box/types';
import Tooltip from '@shared/components/Tooltip';

interface MovementActionsProps {
  movement: Movement;
  onEdit: (movement: Movement) => void;
  onDelete: (movement: Movement) => void;
}

export default function MovementActions({
  movement,
  onEdit,
  onDelete,
}: MovementActionsProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      <Tooltip title='Editar movimiento'>
        <IconButton
          size='small'
          onClick={() => onEdit(movement)}
          sx={{
            color: 'primary.main',
            '&:hover': { bgcolor: 'primary.lighter' },
          }}
        >
          <Edit fontSize='small' />
        </IconButton>
      </Tooltip>

      <Tooltip title='Eliminar movimiento'>
        <IconButton
          size='small'
          onClick={() => onDelete(movement)}
          sx={{
            color: 'error.main',
            '&:hover': { bgcolor: 'error.lighter' },
          }}
        >
          <Delete fontSize='small' />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
