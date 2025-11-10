import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { HomeWork, AddBusiness, Search } from '@mui/icons-material';
import { usePermissions } from '@shared/hooks/usePermissions';

interface ConstructionHeaderProps {
  onCreateConstruction?: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function ConstructionHeader({
  onCreateConstruction,
  searchQuery,
  onSearchChange,
}: ConstructionHeaderProps) {
  const { canCreate } = usePermissions();
  const canCreateConstruction = canCreate('construction');

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
        <HomeWork sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant='h4' fontWeight={600}>
          Obras
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder='Buscar obras...'
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

        {canCreateConstruction && (
          <Button
            variant='contained'
            startIcon={<AddBusiness />}
            onClick={onCreateConstruction}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Crear Obra
          </Button>
        )}
      </Box>
    </Box>
  );
}
