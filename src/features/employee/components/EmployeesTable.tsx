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
import { Employee } from '@features/employee/types';
import { usePermissions } from '@shared/hooks/usePermissions';
import EmployeeTableRow from './EmployeeTableRow';

interface EmployeesTableProps {
  employees: Employee[];
  isLoading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export default function EmployeesTable({
  employees,
  isLoading,
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort,
}: EmployeesTableProps) {
  const { hasAnyActionPermission } = usePermissions();
  const showActionsColumn = hasAnyActionPermission('employee');

  const createSortHandler = (field: string) => () => {
    onSort(field);
  };

  const colSpan = showActionsColumn ? 5 : 4;

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
                active={sortBy === 'last_name'}
                direction={sortBy === 'last_name' ? sortOrder : 'asc'}
                onClick={createSortHandler('last_name')}
              >
                Apellido
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }}>
              <TableSortLabel
                active={sortBy === 'workstation'}
                direction={sortBy === 'workstation' ? sortOrder : 'asc'}
                onClick={createSortHandler('workstation')}
              >
                Puesto
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
          ) : employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan} sx={{ textAlign: 'center', py: 4 }}>
                <Typography color='text.secondary'>
                  No se encontraron empleados
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee: Employee) => (
              <TableRow key={employee.dni} hover>
                <EmployeeTableRow
                  employee={employee}
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
}
