import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { ReactNode } from 'react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: 'success' | 'error' | 'info';
  isLoading?: boolean;
}

export default function SummaryCard({
  title,
  value,
  icon,
  color,
  isLoading,
}: SummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(amount);
  };

  const colorMap = {
    success: {
      bg: 'success.lighter',
      text: 'success.main',
    },
    error: {
      bg: 'error.lighter',
      text: 'error.main',
    },
    info: {
      bg: 'info.lighter',
      text: 'info.main',
    },
  };

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
      }}
    >
      <CardContent>
        <Box display='flex' alignItems='center' gap={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: colorMap[color].bg,
              color: colorMap[color].text,
            }}
          >
            {icon}
          </Box>
          <Box flex={1}>
            <Typography variant='body2' color='text.secondary' gutterBottom>
              {title}
            </Typography>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant='h5' fontWeight={600}>
                {formatCurrency(value)}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
