import { Box, IconButton } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { Movement } from '@features/box/types';
import Tooltip from '@shared/components/Tooltip';
import { usePermissions } from '@shared/hooks/usePermissions';

interface MovementActionsProps {
  movement: Movement;
  onView: (movement: Movement) => void;
  onEdit: (movement: Movement) => void;
  onDelete: (movement: Movement) => void;
}

export default function MovementActions({
  movement,
  onView,
  onEdit,
  onDelete,
}: MovementActionsProps) {
  const { canUpdate, canDelete } = usePermissions();
  const canEditMovement = canUpdate('box');
  const canDeleteMovement = canDelete('box');

  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      <Tooltip title='Ver detalle'>
        <IconButton
          size='small'
          onClick={() => onView(movement)}
          sx={{
            color: 'info.main',
            '&:hover': { bgcolor: 'info.lighter' },
          }}
        >
          <Visibility fontSize='small' />
        </IconButton>
      </Tooltip>

      {canEditMovement && (
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
      )}

      {canDeleteMovement && (
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
      )}
    </Box>
  );
}
