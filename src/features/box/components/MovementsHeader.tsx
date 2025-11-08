import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { AccountBalance, Add, Search, Category } from '@mui/icons-material';

interface MovementsHeaderProps {
  onCreateMovement?: () => void;
  onManageConcepts?: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dateFrom?: string;
  dateTo?: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

export default function MovementsHeader({
  onCreateMovement,
  onManageConcepts,
  searchQuery,
  onSearchChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: MovementsHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
          <AccountBalance sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant='h4' fontWeight={600}>
            Movimientos
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant='outlined'
            startIcon={<Category />}
            onClick={onManageConcepts}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Conceptos
          </Button>

          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={onCreateMovement}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Crear Movimiento
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          placeholder='Buscar movimientos...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          size='small'
          sx={{ minWidth: 250, flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label='Desde'
          type='date'
          value={dateFrom || ''}
          onChange={(e) => onDateFromChange(e.target.value)}
          size='small'
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ minWidth: 180 }}
        />

        <TextField
          label='Hasta'
          type='date'
          value={dateTo || ''}
          onChange={(e) => onDateToChange(e.target.value)}
          size='small'
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ minWidth: 180 }}
        />
      </Box>
    </Box>
  );
}
