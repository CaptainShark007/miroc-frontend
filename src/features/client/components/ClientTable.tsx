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
import { Client } from '../types/clientTypes';
import { usePermissions } from '@shared/hooks/usePermissions';
import ClientTableRow from './ClientTableRow';

interface ClientTableProps {
  clients: Client[];
  isLoading: boolean;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export const ClientTable = ({
  clients,
  isLoading,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}: ClientTableProps) => {
  const { hasAnyActionPermission } = usePermissions();
  const showActionsColumn = hasAnyActionPermission('client');

  const createSortHandler = (field: string) => () => {
    onSort(field);
  };

  const colSpan = showActionsColumn ? 4 : 3;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'background.default' }}>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'dni'}
                direction={sortBy === 'dni' ? sortOrder : 'asc'}
                onClick={createSortHandler('dni')}
              >
                DNI
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
                active={sortBy === 'address'}
                direction={sortBy === 'address' ? sortOrder : 'asc'}
                onClick={createSortHandler('address')}
              >
                Dirección
              </TableSortLabel>
            </TableCell>
            {showActionsColumn && (
              <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
                Acciones
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={colSpan} sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan} sx={{ textAlign: 'center', py: 4 }}>
                <Typography color='text.secondary'>
                  No se encontraron clientes
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client: Client) => (
              <TableRow key={client.id || client.dni} hover>
                <ClientTableRow
                  client={client}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  showActions={showActionsColumn}
                />
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
