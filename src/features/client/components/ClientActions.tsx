import { Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Client } from '@features/client/types/clientTypes';
import Tooltip from '@shared/components/Tooltip';

interface ClientActionsProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export default function ClientActions({
  client,
  onEdit,
  onDelete,
}: ClientActionsProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      <Tooltip title='Editar cliente'>
        <IconButton
          size='small'
          onClick={() => onEdit(client)}
          sx={{
            color: 'primary.main',
            '&:hover': { bgcolor: 'primary.lighter' },
          }}
        >
          <Edit fontSize='small' />
        </IconButton>
      </Tooltip>

      <Tooltip title='Eliminar cliente'>
        <IconButton
          size='small'
          onClick={() => onDelete(client)}
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
