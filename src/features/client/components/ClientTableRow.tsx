import { TableCell } from '@mui/material';
import { Client } from '../types/clientTypes';
import { formatDNI } from '@shared/utils/formatters';
import ClientActions from './ClientActions';

interface ClientTableRowProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export default function ClientTableRow({
  client,
  onEdit,
  onDelete,
}: ClientTableRowProps) {
  return (
    <>
      <TableCell>{formatDNI(client.dni)}</TableCell>
      <TableCell>{client.firstName}</TableCell>
      <TableCell>{client.address}</TableCell>
      <TableCell>
        <ClientActions
          client={client}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </>
  );
}
