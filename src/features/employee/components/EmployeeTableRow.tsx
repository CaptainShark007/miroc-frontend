import { TableCell, Chip } from '@mui/material';
import { Employee } from '@features/employee/types';
import { formatDNI } from '@shared/utils/formatters';
import EmployeeActions from './EmployeeActions';

interface EmployeeTableRowProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  showActions?: boolean;
}

export default function EmployeeTableRow({
  employee,
  onEdit,
  onDelete,
  showActions = true,
}: EmployeeTableRowProps) {
  return (
    <>
      <TableCell>{formatDNI(employee.dni)}</TableCell>
      <TableCell>{employee.firstName}</TableCell>
      <TableCell>{employee.lastName}</TableCell>
      <TableCell>
        <Chip
          label={employee.workStation}
          color='primary'
          size='small'
          variant='outlined'
        />
      </TableCell>
      {showActions && (
        <TableCell>
          <EmployeeActions
            employee={employee}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TableCell>
      )}
    </>
  );
}
