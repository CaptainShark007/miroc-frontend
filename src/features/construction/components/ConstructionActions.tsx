import { Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Construction } from '@features/construction/types';
import Tooltip from '@shared/components/Tooltip';
import { usePermissions } from '@shared/hooks/usePermissions';

interface ConstructionActionsProps {
  construction: Construction;
  onEdit: (construction: Construction) => void;
  onDelete: (construction: Construction) => void;
}

export default function ConstructionActions({
  construction,
  onEdit,
  onDelete,
}: ConstructionActionsProps) {
  const { canUpdate, canDelete } = usePermissions();

  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      {canUpdate('construction') && (
        <Tooltip title='Editar obra'>
          <IconButton
            size='small'
            onClick={() => onEdit(construction)}
            sx={{
              color: 'primary.main',
              '&:hover': { bgcolor: 'primary.lighter' },
            }}
          >
            <Edit fontSize='small' />
          </IconButton>
        </Tooltip>
      )}

      {canDelete('construction') && (
        <Tooltip title='Eliminar obra'>
          <IconButton
            size='small'
            onClick={() => onDelete(construction)}
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
