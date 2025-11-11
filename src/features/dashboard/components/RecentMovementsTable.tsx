import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Box,
} from '@mui/material';
import type { Movement } from '@features/box/types';

interface RecentMovementsTableProps {
  movements: Movement[];
  isLoading: boolean;
}

export default function RecentMovementsTable({
  movements,
  isLoading,
}: RecentMovementsTableProps) {
  const formatDateTime = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return dateString;
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      CREDIT_CARD: 'Tarjeta de Crédito',
      DEBIT_CARD: 'Tarjeta de Débito',
      PAYPAL: 'PayPal',
      BANK_TRANSFER: 'Transferencia',
      CASH: 'Efectivo',
      MOBILE_PAYMENT: 'Pago Móvil',
    };
    return labels[method] || method;
  };

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (movements.length === 0) {
    return (
      <Box p={4} textAlign='center'>
        <Typography color='text.secondary'>
          No hay movimientos recientes
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer 
      component={Paper}
      sx={{ 
        border: 1, 
        borderColor: 'divider',
        maxHeight: 500,
        overflow: 'auto',
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='subtitle2' fontWeight={600}>
                Fecha
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle2' fontWeight={600}>
                Concepto
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle2' fontWeight={600}>
                Tipo
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle2' fontWeight={600}>
                Monto
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle2' fontWeight={600}>
                Método de Pago
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle2' fontWeight={600}>
                Asociado a
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map((movement) => (
            <TableRow
              key={movement.codeMovement}
              hover
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Typography variant='body2'>
                  {formatDateTime(movement.date)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2' fontWeight={500}>
                  {movement.conceptName}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={movement.conceptType === 'ingreso' ? 'Ingreso' : 'Egreso'}
                  size='small'
                  color={movement.conceptType === 'ingreso' ? 'success' : 'error'}
                  variant='outlined'
                  sx={{ fontWeight: 500 }}
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant='body2'
                  fontWeight={600}
                  color={
                    movement.conceptType === 'ingreso'
                      ? 'success.main'
                      : 'error.main'
                  }
                >
                  {formatCurrency(movement.amount)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>
                  {getPaymentMethodLabel(movement.paymentMethod)}
                </Typography>
              </TableCell>
              <TableCell>
                {movement.associatedEntity ? (
                  <Typography variant='body2' color='text.secondary'>
                    {movement.associatedEntity.type}
                  </Typography>
                ) : (
                  <Typography variant='body2' color='text.disabled'>
                    -
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
