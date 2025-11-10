import { Box, Paper, Typography, Skeleton } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalance } from '@mui/icons-material';
import { formatNumber } from '@shared/utils/formatters';
import { useMovementsSummary } from '@features/box/hooks/useMovementsSummary';

export default function MovementsSummaryCards() {
  const { data, isLoading } = useMovementsSummary();

  const summary = data?.data;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        {[1, 2, 3].map((item) => (
          <Paper
            key={item}
            sx={{
              p: 2.5,
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Skeleton variant='text' width='60%' height={24} />
            <Skeleton variant='text' width='80%' height={40} sx={{ mt: 1 }} />
          </Paper>
        ))}
      </Box>
    );
  }

  if (!summary) return null;

  const cards = [
    {
      title: 'Total Ingresos',
      value: summary.totalIncome,
      icon: TrendingUp,
      color: 'success.main',
      bgColor: 'rgba(76, 175, 80, 0.1)',
      showSign: false,
    },
    {
      title: 'Total Egresos',
      value: summary.totalExpense,
      icon: TrendingDown,
      color: 'error.main',
      bgColor: 'rgba(244, 67, 54, 0.1)',
      showSign: false,
    },
    {
      title: 'Balance Neto',
      value: summary.netBalance,
      icon: AccountBalance,
      color: summary.netBalance >= 0 ? 'success.main' : 'error.main',
      bgColor:
        summary.netBalance >= 0
          ? 'rgba(76, 175, 80, 0.1)'
          : 'rgba(244, 67, 54, 0.1)',
      showSign: true,
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 2,
        mb: 3,
      }}
    >
      {cards.map((card, index) => (
        <Paper
          key={index}
          sx={{
            p: 2.5,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 3,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography
                variant='body2'
                color='text.secondary'
                fontWeight={500}
                gutterBottom
              >
                {card.title}
              </Typography>
              <Typography
                variant='h5'
                fontWeight={700}
                color={card.color}
                sx={{ mt: 0.5 }}
              >
                {card.showSign && card.value < 0 ? '-' : ''}$
                {formatNumber(Math.abs(card.value))}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: card.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <card.icon sx={{ fontSize: 32, color: card.color }} />
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
