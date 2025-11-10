import { Chip } from '@mui/material';
import { getConstructionStatus } from '@features/construction/utils/constructionStatus';

interface ConstructionStatusBadgeProps {
  startDate: string;
  endDate: string | null;
}

const getStatusColor = (
  status: string
): 'info' | 'success' | 'warning' | 'error' | 'default' => {
  switch (status) {
    case 'planned':
      return 'info';
    case 'in-progress':
      return 'success';
    case 'ending-soon':
      return 'warning';
    case 'finished':
      return 'error';
    default:
      return 'default';
  }
};

export default function ConstructionStatusBadge({
  startDate,
  endDate,
}: ConstructionStatusBadgeProps) {
  const statusConfig = getConstructionStatus(startDate, endDate);

  return (
    <Chip
      label={statusConfig.label}
      size='small'
      variant='outlined'
      color={getStatusColor(statusConfig.status)}
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        height: '24px',
        borderRadius: '12px',
      }}
    />
  );
}
