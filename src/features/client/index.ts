// Components
export { default as ClientHeader } from './components/ClientHeader';
export { ClientTable } from './components/ClientTable';
export { ClientForm } from './components/ClientForm';
export { DeleteClientDialog } from './components/DeleteClientDialog';
export { PatchClientDialog } from './components/PatchClientDialog';

// Pages
export { ClientAdminPage } from './pages/ClientAdminPage';

// Hooks
export {
  useClients,
  useClientByDni,
  useCreateClient,
  useUpdateClient,
  usePatchClient,
  useDeleteClient,
} from './hooks/useClients';

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
  PaginatedResponse,
  CreateClientPayload,
  UpdateClientPayload,
  PatchOperation,
} from './types/clientTypes';
