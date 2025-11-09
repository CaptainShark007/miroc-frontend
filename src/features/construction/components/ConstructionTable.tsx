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
import { Construction } from '@features/construction/types';
import ConstructionTableRow from './ConstructionTableRow';

interface ConstructionTableProps {
  constructions: Construction[];
  isLoading: boolean;
  onEdit: (construction: Construction) => void;
  onDelete: (construction: Construction) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export default function ConstructionTable({
  constructions,
  isLoading,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}: ConstructionTableProps) {
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
                active={sortBy === 'name'}
                direction={sortBy === 'name' ? sortOrder : 'asc'}
                onClick={createSortHandler('name')}
              >
                Nombre
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              Estado
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'start_date'}
                direction={sortBy === 'start_date' ? sortOrder : 'asc'}
                onClick={createSortHandler('start_date')}
              >
                Fecha Inicio
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'end_date'}
                direction={sortBy === 'end_date' ? sortOrder : 'asc'}
                onClick={createSortHandler('end_date')}
              >
                Fecha Fin
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'address'}
                direction={sortBy === 'address' ? sortOrder : 'asc'}
                onClick={createSortHandler('address')}
              >
                Ubicación
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'client_dni'}
                direction={sortBy === 'client_dni' ? sortOrder : 'asc'}
                onClick={createSortHandler('client_dni')}
              >
                DNI Cliente
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
              <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : constructions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                <Typography color='text.secondary'>
                  No se encontraron obras
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            constructions.map((construction: Construction, index: number) => (
              <TableRow
                key={`${construction.name}-${construction.clientDni}-${index}`}
                hover
              >
                <ConstructionTableRow
                  construction={construction}
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
