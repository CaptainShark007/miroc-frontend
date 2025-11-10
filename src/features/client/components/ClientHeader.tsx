import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { People, PersonAdd, Search } from '@mui/icons-material';
import { usePermissions } from '@shared/hooks/usePermissions';

interface ClientHeaderProps {
  onCreateClient?: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function ClientHeader({
  onCreateClient,
  searchQuery,
  onSearchChange,
}: ClientHeaderProps) {
  const { canCreate } = usePermissions();
  const canCreateClient = canCreate('client');

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
        <People sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant='h4' fontWeight={600}>
          Clientes
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder='Buscar clientes...'
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

        {canCreateClient && (
          <Button
            variant='contained'
            startIcon={<PersonAdd />}
            onClick={onCreateClient}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Crear Cliente
          </Button>
        )}
      </Box>
    </Box>
  );
}
