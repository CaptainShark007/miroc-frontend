// Components
export { default as ClientHeader } from './components/ClientHeader';
export { ClientTable } from './components/ClientTable';
export { default as ClientTableRow } from './components/ClientTableRow';
export { default as ClientActions } from './components/ClientActions';
export { ClientForm } from './components/ClientForm';
export { DeleteClientDialog } from './components/DeleteClientDialog';
export { PatchClientDialog } from './components/PatchClientDialog';

// Pages
export { default as ClientAdminPage } from './pages/ClientAdminPage';

// Hooks
export {
  useClients,
  useClientByDni,
  useCreateClient,
  useUpdateClient,
  usePatchClient,
} from './hooks/useClients';
export { useDeleteClient } from './hooks/useDeleteClient';

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
  UpdateClientPayload,
  PatchOperation,
  ApiResponse,
  ApiError,
  GetClientResponse,
  CreateClientResponse,
  UpdateClientResponse,
  DeleteClientResponse,
} from './types/clientTypes';
