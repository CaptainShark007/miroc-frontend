// Components
export { default as ClientHeader } from './components/ClientHeader';
export { ClientTable } from './components/ClientTable';
export { default as ClientTableRow } from './components/ClientTableRow';
export { default as ClientActions } from './components/ClientActions';

// Pages
export { default as ClientAdminPage } from './pages/ClientAdminPage';

// Hooks
export {
  useClients,
  useCreateClient,
} from './hooks/useClients';
export { useClientByDni } from './hooks/useClientByDni';
export { useDeleteClient } from './hooks/useDeleteClient';
export { useClientActions } from './hooks/useClientActions';
export { useUpdateClient } from './hooks/useUpdateClient';

// Services
export {
  getClients,
  getClientByDni,
  createClient,
  updateClient,
  patchClient,
  deleteClient,
} from './api/service';

// Types
export type {
  Client,
  GetClientsRequest,
  PaginatedResponse,
  PaginationData,
  CreateClientPayload,
  PatchOperation,
  ApiResponse,
  ApiError,
  GetClientResponse,
  CreateClientResponse,
  UpdateClientResponse,
  DeleteClientResponse,
} from './types/clientTypes';
