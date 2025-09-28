import { TableCell, Chip } from '@mui/material';
import { User } from '@features/admin/types';
import { formatDNI } from '@shared/utils/formatters';
import UserActions from './UserActions';

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const getRoleColor = (role: string) => {
  switch (role.toUpperCase()) {
    case 'ADMIN':
      return 'error';
    case 'PROFESSIONAL':
      return 'primary';
    case 'CUSTOMER':
      return 'success';
    case 'DEVELOPER':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusColor = (status: string) => {
  return status.toLowerCase() === 'active' ? 'success' : 'error';
};

export default function UserTableRow({
  user,
  onEdit,
  onDelete,
}: UserTableRowProps) {
  return (
    <>
      <TableCell>{formatDNI(user.dni)}</TableCell>
      <TableCell>{user.firstName}</TableCell>
      <TableCell>{user.lastName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Chip
          label={user.role}
          color={getRoleColor(user.role) as any}
          size='small'
          variant='outlined'
        />
      </TableCell>
      <TableCell>
        <Chip
          label={user.status}
          color={getStatusColor(user.status) as any}
          size='small'
          variant='filled'
        />
      </TableCell>
      <TableCell>
        <UserActions user={user} onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </>
  );
}
