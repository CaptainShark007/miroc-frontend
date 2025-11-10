import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  Divider,
  Chip,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Close, Receipt } from '@mui/icons-material';
import { Movement } from '@features/box/types';
import { formatNumber } from '@shared/utils/formatters';
import { useClientByDni } from '@features/client/hooks/useClientByDni';
import { useProviderByCuit } from '@features/provider/hooks/useProviderByCuit';
import { useEmployeeByDni } from '@features/employee/hooks/useEmployeeByDni';
import { useConstructionByNombre } from '@features/construction/hooks/useConstructionByNombre';

interface MovementDetailDialogProps {
  open: boolean;
  onClose: () => void;
  movement: Movement | null;
}

export default function MovementDetailDialog({
  open,
  onClose,
  movement,
}: MovementDetailDialogProps) {
  const entityKey = movement?.associatedEntity?.key;
  const entityType = movement?.associatedEntity?.type;

  const { data: clientData, isLoading: isLoadingClient } = useClientByDni(
    entityType === 'CLIENTE' ? entityKey : undefined
  );
  const { data: providerData, isLoading: isLoadingProvider } =
    useProviderByCuit(entityType === 'PROVEEDOR' ? entityKey : undefined);
  const { data: employeeData, isLoading: isLoadingEmployee } = useEmployeeByDni(
    entityType === 'EMPLEADO' ? String(entityKey) : undefined
  );
  const { data: constructionData, isLoading: isLoadingConstruction } =
    useConstructionByNombre(
      entityType === 'OBRA' ? String(entityKey) : undefined
    );

  if (!movement) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      CASH: 'Efectivo',
      CREDIT_CARD: 'Tarjeta de Crédito',
      DEBIT_CARD: 'Tarjeta de Débito',
      BANK_TRANSFER: 'Transferencia Bancaria',
      PAYPAL: 'PayPal',
      MOBILE_PAYMENT: 'Pago Móvil',
    };
    return labels[method] || method;
  };

  const getEntityLabel = (entity: Movement['associatedEntity']) => {
    if (!entity) return 'General';
    const typeLabels: Record<string, string> = {
      CLIENTE: 'Cliente',
      PROVEEDOR: 'Proveedor',
      EMPLEADO: 'Empleado',
      OBRA: 'Obra',
    };
    return typeLabels[entity.type] || entity.type;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Receipt color='primary' />
          <Typography variant='h6' fontWeight={600}>
            Detalle del Movimiento
          </Typography>
        </Box>
        <IconButton onClick={onClose} size='small'>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='body2' color='text.secondary'>
                Código
              </Typography>
              <Typography variant='body1' fontWeight={600}>
                #{formatNumber(movement.codeMovement)}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              Fecha y Hora
            </Typography>
            <Typography variant='body1' fontWeight={500}>
              {formatDate(movement.date)}
            </Typography>
          </Box>

          <Box>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              Concepto
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='body1' fontWeight={500}>
                {movement.conceptName}
              </Typography>
              <Chip
                label={
                  movement.conceptType === 'ingreso' ? 'Ingreso' : 'Egreso'
                }
                color={movement.conceptType === 'ingreso' ? 'success' : 'error'}
                size='small'
                variant='outlined'
              />
            </Box>
          </Box>

          {movement.conceptDescription && (
            <Box>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                Descripción del Concepto
              </Typography>
              <Typography variant='body1'>
                {movement.conceptDescription}
              </Typography>
            </Box>
          )}

          <Divider />

          <Box>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              Monto
            </Typography>
            <Typography
              variant='h5'
              fontWeight={700}
              color={
                movement.conceptType === 'ingreso'
                  ? 'success.main'
                  : 'error.main'
              }
            >
              {movement.conceptType === 'ingreso' ? '+' : '-'} $
              {formatNumber(movement.amount)}
            </Typography>
          </Box>

          <Box>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              Método de Pago
            </Typography>
            <Chip
              label={getPaymentMethodLabel(movement.paymentMethod)}
              size='medium'
              variant='outlined'
            />
          </Box>

          <Divider />

          <Box>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              Entidad Asociada
            </Typography>
            {movement.associatedEntity ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant='body1' fontWeight={500}>
                  {getEntityLabel(movement.associatedEntity)}
                </Typography>

                {entityType === 'CLIENTE' && (
                  <Paper
                    variant='outlined'
                    sx={{
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                    }}
                  >
                    {isLoadingClient ? (
                      <Box
                        sx={{ display: 'flex', justifyContent: 'center', p: 1 }}
                      >
                        <CircularProgress size={24} />
                      </Box>
                    ) : clientData?.data ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        <Typography variant='body2'>
                          <strong>DNI:</strong>{' '}
                          {formatNumber(clientData.data.dni)}
                        </Typography>
                        <Typography variant='body2'>
                          <strong>Nombre:</strong> {clientData.data.firstName}
                        </Typography>
                        {clientData.data.address && (
                          <Typography variant='body2'>
                            <strong>Dirección:</strong>{' '}
                            {clientData.data.address}
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <Typography variant='body2' color='error'>
                        No se pudo cargar la información del cliente
                      </Typography>
                    )}
                  </Paper>
                )}

                {entityType === 'PROVEEDOR' && (
                  <Paper
                    variant='outlined'
                    sx={{
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                    }}
                  >
                    {isLoadingProvider ? (
                      <Box
                        sx={{ display: 'flex', justifyContent: 'center', p: 1 }}
                      >
                        <CircularProgress size={24} />
                      </Box>
                    ) : providerData?.data ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        <Typography variant='body2'>
                          <strong>CUIT:</strong>{' '}
                          {formatNumber(providerData.data.cuit)}
                        </Typography>
                        <Typography variant='body2'>
                          <strong>Nombre:</strong> {providerData.data.firstName}
                        </Typography>
                        {providerData.data.address && (
                          <Typography variant='body2'>
                            <strong>Dirección:</strong>{' '}
                            {providerData.data.address}
                          </Typography>
                        )}
                        {providerData.data.description && (
                          <Typography variant='body2'>
                            <strong>Descripción:</strong>{' '}
                            {providerData.data.description}
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <Typography variant='body2' color='error'>
                        No se pudo cargar la información del proveedor
                      </Typography>
                    )}
                  </Paper>
                )}

                {entityType === 'EMPLEADO' && (
                  <Paper
                    variant='outlined'
                    sx={{
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                    }}
                  >
                    {isLoadingEmployee ? (
                      <Box
                        sx={{ display: 'flex', justifyContent: 'center', p: 1 }}
                      >
                        <CircularProgress size={24} />
                      </Box>
                    ) : employeeData?.data ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        <Typography variant='body2'>
                          <strong>DNI:</strong>{' '}
                          {formatNumber(employeeData.data.dni)}
                        </Typography>
                        <Typography variant='body2'>
                          <strong>Nombre:</strong> {employeeData.data.firstName}{' '}
                          {employeeData.data.lastName}
                        </Typography>
                        {employeeData.data.workStation && (
                          <Typography variant='body2'>
                            <strong>Puesto:</strong>{' '}
                            {employeeData.data.workStation}
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <Typography variant='body2' color='error'>
                        No se pudo cargar la información del empleado
                      </Typography>
                    )}
                  </Paper>
                )}

                {entityType === 'OBRA' && (
                  <Paper
                    variant='outlined'
                    sx={{
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                    }}
                  >
                    {isLoadingConstruction ? (
                      <Box
                        sx={{ display: 'flex', justifyContent: 'center', p: 1 }}
                      >
                        <CircularProgress size={24} />
                      </Box>
                    ) : constructionData?.data ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        <Typography variant='body2'>
                          <strong>Nombre:</strong> {constructionData.data.name}
                        </Typography>
                        {constructionData.data.address && (
                          <Typography variant='body2'>
                            <strong>Dirección:</strong>{' '}
                            {constructionData.data.address}
                          </Typography>
                        )}
                        {constructionData.data.description && (
                          <Typography variant='body2'>
                            <strong>Descripción:</strong>{' '}
                            {constructionData.data.description}
                          </Typography>
                        )}
                        {constructionData.data.startDate && (
                          <Typography variant='body2'>
                            <strong>Fecha Inicio:</strong>{' '}
                            {new Date(
                              constructionData.data.startDate
                            ).toLocaleDateString('es-AR')}
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <Typography variant='body2' color='error'>
                        No se pudo cargar la información de la obra
                      </Typography>
                    )}
                  </Paper>
                )}
              </Box>
            ) : (
              <Typography variant='body1'>General</Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          variant='contained'
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
