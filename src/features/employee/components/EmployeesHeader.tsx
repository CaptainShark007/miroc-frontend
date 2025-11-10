import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Group, PersonAdd, Search } from '@mui/icons-material';
import { usePermissions } from '@shared/hooks/usePermissions';

interface EmployeesHeaderProps {
  onCreateEmployee?: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function EmployeesHeader({
  onCreateEmployee,
  searchQuery,
  onSearchChange,
}: EmployeesHeaderProps) {
  const { canCreate } = usePermissions();
  const canCreateEmployee = canCreate('employee');

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 3,
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Group sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant='h4' fontWeight={600}>
          Empleados
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder='Buscar empleados...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          size='small'
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {canCreateEmployee && (
          <Button
            variant='contained'
            startIcon={<PersonAdd />}
            onClick={onCreateEmployee}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Crear Empleado
          </Button>
        )}
      </Box>
    </Box>
  );
}
