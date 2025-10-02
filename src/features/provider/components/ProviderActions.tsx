import { Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Tooltip from '@/shared/components/Tooltip';
import { Provider } from '@/features/provider/types';

interface ProviderActionsProps {
  provider: Provider;
  onEdit: (provider: Provider) => void;
  onDelete: (provider: Provider) => void;
}

export default function ProviderActions({
  provider,
  onEdit,
  onDelete,
}: ProviderActionsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'center',
      }}
    >
      <Tooltip title='Editar proveedor'>
        <IconButton
          size='small'
          onClick={() => onEdit(provider)}
          color='primary'
          aria-label='editar proveedor'
        >
          <Edit fontSize='small' />
        </IconButton>
      </Tooltip>
      <Tooltip title='Eliminar proveedor'>
        <IconButton
          size='small'
          onClick={() => onDelete(provider)}
          color='error'
          aria-label='eliminar proveedor'
        >
          <Delete fontSize='small' />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
