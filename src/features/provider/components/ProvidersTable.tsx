import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  TableSortLabel,
} from '@mui/material';
import { Provider } from '@/features/provider/types';
import ProviderTableRow from './ProviderTableRow';

interface ProvidersTableProps {
  providers: Provider[];
  isLoading: boolean;
  onEdit: (provider: Provider) => void;
  onDelete: (provider: Provider) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export default function ProvidersTable({
  providers,
  isLoading,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}: ProvidersTableProps) {
  const createSortHandler = (field: string) => () => {
    onSort(field);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'background.default' }}>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'cuit'}
                direction={sortBy === 'cuit' ? sortOrder : 'asc'}
                onClick={createSortHandler('cuit')}
              >
                CUIT
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'first_name'}
                direction={sortBy === 'first_name' ? sortOrder : 'asc'}
                onClick={createSortHandler('first_name')}
              >
                Nombre
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'description'}
                direction={sortBy === 'description' ? sortOrder : 'asc'}
                onClick={createSortHandler('description')}
              >
                Descripción
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'address'}
                direction={sortBy === 'address' ? sortOrder : 'asc'}
                onClick={createSortHandler('address')}
              >
                Dirección
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : providers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  No se encontraron proveedores
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            providers.map((provider) => (
              <TableRow key={provider.cuit} hover>
                <ProviderTableRow
                  provider={provider}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}