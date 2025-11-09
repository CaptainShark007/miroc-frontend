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
import { Movement } from '@features/box/types';
import MovementTableRow from './MovementTableRow';

interface MovementsTableProps {
  movements: Movement[];
  isLoading: boolean;
  onView: (movement: Movement) => void;
  onEdit: (movement: Movement) => void;
  onDelete: (movement: Movement) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export default function MovementsTable({
  movements,
  isLoading,
  onView,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}: MovementsTableProps) {
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
                active={sortBy === 'code'}
                direction={sortBy === 'code' ? sortOrder : 'asc'}
                onClick={createSortHandler('code')}
              >
                Código
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'date'}
                direction={sortBy === 'date' ? sortOrder : 'asc'}
                onClick={createSortHandler('date')}
              >
                Fecha
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Concepto</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Tipo</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'amount'}
                direction={sortBy === 'amount' ? sortOrder : 'asc'}
                onClick={createSortHandler('amount')}
              >
                Monto
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Método de Pago</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Entidad Asociada</TableCell>
            <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : movements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4 }}>
                <Typography color='text.secondary'>
                  No se encontraron movimientos
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            movements.map((movement: Movement) => (
              <TableRow key={movement.codeMovement} hover>
                <MovementTableRow
                  movement={movement}
                  onView={onView}
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
