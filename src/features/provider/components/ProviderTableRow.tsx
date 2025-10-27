import { TableCell } from '@mui/material';
import { Provider } from '@/features/provider/types';
import { formatCUIT } from '@/shared/utils/formatters';
import ProviderActions from './ProviderActions';

interface ProviderTableRowProps {
  provider: Provider;
  onEdit: (provider: Provider) => void;
  onDelete: (provider: Provider) => void;
}

export default function ProviderTableRow({
  provider,
  onEdit,
  onDelete,
}: ProviderTableRowProps) {
  return (
    <>
      <TableCell>{formatCUIT(provider.cuit)}</TableCell>
      <TableCell>{provider.firstName}</TableCell>
      <TableCell>{provider.description}</TableCell>
      <TableCell>{provider.address}</TableCell>
      <TableCell>
        <ProviderActions
          provider={provider}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </>
  );
}
