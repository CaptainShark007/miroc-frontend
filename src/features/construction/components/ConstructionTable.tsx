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
                active={sortBy === 'nombre'}
                direction={sortBy === 'nombre' ? sortOrder : 'asc'}
                onClick={createSortHandler('nombre')}
              >
                Nombre
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'fechaInicio'}
                direction={sortBy === 'fechaInicio' ? sortOrder : 'asc'}
                onClick={createSortHandler('fechaInicio')}
              >
                Fecha Inicio
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'fechaFin'}
                direction={sortBy === 'fechaFin' ? sortOrder : 'asc'}
                onClick={createSortHandler('fechaFin')}
              >
                Fecha Fin
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'ubicacion'}
                direction={sortBy === 'ubicacion' ? sortOrder : 'asc'}
                onClick={createSortHandler('ubicacion')}
              >
                Ubicación
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'dniCliente'}
                direction={sortBy === 'dniCliente' ? sortOrder : 'asc'}
                onClick={createSortHandler('dniCliente')}
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
              <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : constructions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                <Typography color='text.secondary'>
                  No se encontraron obras
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            constructions.map((construction: Construction) => (
              <TableRow key={construction.name} hover>
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
