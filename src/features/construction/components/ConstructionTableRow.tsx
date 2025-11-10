import { TableCell } from '@mui/material';
import { formatDNI, formatDateToDisplay } from '@shared/utils/formatters';
import { Construction } from '@features/construction/types';
import ConstructionActions from './ConstructionActions';
import ConstructionStatusBadge from './ConstructionStatusBadge';

interface ConstructionTableRowProps {
  construction: Construction;
  onEdit: (construction: Construction) => void;
  onDelete: (construction: Construction) => void;
  showActions?: boolean;
}

export default function ConstructionTableRow({
  construction,
  onEdit,
  onDelete,
  showActions = true,
}: ConstructionTableRowProps) {
  return (
    <>
      <TableCell>{construction.name}</TableCell>
      <TableCell>
        <ConstructionStatusBadge
          startDate={construction.startDate}
          endDate={construction.endDate}
        />
      </TableCell>
      <TableCell>{formatDateToDisplay(construction.startDate)}</TableCell>
      <TableCell>{formatDateToDisplay(construction.endDate)}</TableCell>
      <TableCell>{construction.address}</TableCell>
      <TableCell>{formatDNI(construction.clientDni)}</TableCell>
      {showActions && (
        <TableCell sx={{ textAlign: 'center' }}>
          <ConstructionActions
            construction={construction}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TableCell>
      )}
    </>
  );
}
