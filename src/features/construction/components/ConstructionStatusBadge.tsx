import { Chip } from '@mui/material';
import { getConstructionStatus } from '@features/construction/utils/constructionStatus';

interface ConstructionStatusBadgeProps {
  startDate: string;
  endDate: string;
}

export default function ConstructionStatusBadge({
  startDate,
  endDate,
}: ConstructionStatusBadgeProps) {
  const statusConfig = getConstructionStatus(startDate, endDate);

  return (
    <Chip
      label={statusConfig.label}
      size="small"
      sx={{
        backgroundColor: statusConfig.bgColor,
        color: statusConfig.color,
        fontWeight: 600,
        fontSize: '0.75rem',
        height: '24px',
        borderRadius: '12px',
      }}
    />
  );
}
