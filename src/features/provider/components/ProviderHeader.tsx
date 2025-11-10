import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { SupervisorAccount, PersonAdd, Search } from '@mui/icons-material';
import { usePermissions } from '@shared/hooks/usePermissions';

interface ProviderHeaderProps {
  onCreateProvider?: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function ProviderHeader({
  onCreateProvider,
  searchQuery,
  onSearchChange,
}: ProviderHeaderProps) {
  const { canCreate } = usePermissions();
  const canCreateProvider = canCreate('provider');

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
        <SupervisorAccount sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant='h4' fontWeight={600}>
          Proveedores
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder='Buscar proveedores...'
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

        {canCreateProvider && (
          <Button
            variant='contained'
            startIcon={<PersonAdd />}
            onClick={onCreateProvider}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Crear Proveedor
          </Button>
        )}
      </Box>
    </Box>
  );
}
