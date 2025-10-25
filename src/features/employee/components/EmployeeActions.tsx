import { Box, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Employee } from '@features/employee/types';
import Tooltip from '@shared/components/Tooltip';

interface EmployeeActionsProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export default function EmployeeActions({
  employee,
  onEdit,
  onDelete,
}: EmployeeActionsProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      <Tooltip title='Editar empleado'>
        <IconButton
          size='small'
          onClick={() => onEdit(employee)}
          sx={{
            color: 'primary.main',
            '&:hover': { bgcolor: 'primary.lighter' },
          }}
        >
          <Edit fontSize='small' />
        </IconButton>
      </Tooltip>

      <Tooltip title='Eliminar empleado'>
        <IconButton
          size='small'
          onClick={() => onDelete(employee)}
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
