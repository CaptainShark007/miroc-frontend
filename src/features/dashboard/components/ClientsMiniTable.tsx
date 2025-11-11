import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import { formatDNI } from '@shared/utils/formatters';
import type { Client } from '@features/client/types/clientTypes';

interface ClientsMiniTableProps {
  clients: Client[];
  isLoading: boolean;
}

export default function ClientsMiniTable({
  clients,
  isLoading,
}: ClientsMiniTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (clients.length === 0) {
    return (
      <Box p={4} textAlign='center'>
        <Typography color='text.secondary'>
          No hay clientes registrados
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ border: 1, borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant='subtitle2' fontWeight={600}>
                  DNI
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='subtitle2' fontWeight={600}>
                  Nombre
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='subtitle2' fontWeight={600}>
                  Dirección
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={`client-${client.dni}`}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Typography variant='body2' fontWeight={500}>
                    {formatDNI(client.dni)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2'>{client.firstName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' color='text.secondary'>
                    {client.address}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display='flex' justifyContent='center' mt={2}>
        <Button
          variant='outlined'
          endIcon={<ArrowForward />}
          onClick={() => navigate('/entities/clients')}
        >
          Ver todos los clientes
        </Button>
      </Box>
    </Box>
  );
}
