import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Client } from '../types/clientTypes';
import { formatDNI } from '@shared/utils/formatters';

interface ClientTableProps {
  clients: Client[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export const ClientTable = ({
  clients,
  isLoading,
  error,
  onEdit,
  onDelete,
}: ClientTableProps) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Error al cargar clientes: {error.message}
      </Alert>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <Box py={4} textAlign="center">
        <Typography variant="body1" color="text.secondary">
          No hay clientes registrados
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'background.default' }}>
            <TableCell sx={{ fontWeight: 600 }}>DNI</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Dirección</TableCell>
            <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={`client-${client.dni}-${client.id}`} hover>
              <TableCell>{formatDNI(client.dni)}</TableCell>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => onEdit(client)}
                  aria-label={`editar cliente ${client.firstName}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onDelete(client)}
                  aria-label={`eliminar cliente ${client.firstName}`}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
