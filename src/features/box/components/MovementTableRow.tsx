import { TableCell, Chip } from '@mui/material';
import { Movement } from '@features/box/types';
import { formatNumber } from '@shared/utils/formatters';
import MovementActions from './MovementActions';

interface MovementTableRowProps {
  movement: Movement;
  onView: (movement: Movement) => void;
  onEdit: (movement: Movement) => void;
  onDelete: (movement: Movement) => void;
}

export default function MovementTableRow({
  movement,
  onView,
  onEdit,
  onDelete,
}: MovementTableRowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      CASH: 'Efectivo',
      CREDIT_CARD: 'Tarjeta de Crédito',
      DEBIT_CARD: 'Tarjeta de Débito',
      BANK_TRANSFER: 'Transferencia',
      PAYPAL: 'PayPal',
      MOBILE_PAYMENT: 'Pago Móvil',
    };
    return labels[method] || method;
  };

  const getEntityLabel = (entity: Movement['associatedEntity']) => {
    if (!entity) return 'General';
    return `${entity.type}: ${entity.id}`;
  };

  return (
    <>
      <TableCell>{formatNumber(movement.codeMovement)}</TableCell>
      <TableCell>{formatDate(movement.date)}</TableCell>
      <TableCell>{movement.conceptName}</TableCell>
      <TableCell>
        <Chip
          label={movement.conceptType === 'ingreso' ? 'Ingreso' : 'Egreso'}
          color={movement.conceptType === 'ingreso' ? 'success' : 'error'}
          size='small'
          variant='outlined'
        />
      </TableCell>
      <TableCell>
        <strong>${formatNumber(movement.amount)}</strong>
      </TableCell>
      <TableCell>
        <Chip
          label={getPaymentMethodLabel(movement.paymentMethod)}
          size='small'
          variant='outlined'
        />
      </TableCell>
      <TableCell>
        <Chip
          label={getEntityLabel(movement.associatedEntity)}
          size='small'
          color='default'
          variant='outlined'
        />
      </TableCell>
      <TableCell>
        <MovementActions
          movement={movement}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </>
  );
}
