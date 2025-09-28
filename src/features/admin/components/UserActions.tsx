import { Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Tooltip from '@shared/components/Tooltip';
import { User } from '@features/admin/types';

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserActions({
  user,
  onEdit,
  onDelete,
}: UserActionsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'center',
      }}
    >
      <Tooltip title='Editar usuario'>
        <IconButton
          size='small'
          onClick={() => onEdit(user)}
          color='primary'
          aria-label='editar usuario'
        >
          <Edit fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Eliminar usuario'>
        <IconButton
          size='small'
          onClick={() => onDelete(user)}
          color='error'
          aria-label='eliminar usuario'
        >
          <Delete fontSize='small' />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
