import { Box, Typography, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
} from '@mui/icons-material';
import { useMovementsSummary } from '@features/dashboard/hooks/useMovementsSummary';
import { useRecentMovements } from '@features/dashboard/hooks/useRecentMovements';
import { useClientsSummary } from '@features/dashboard/hooks/useClientsSummary';
import { useConstructionsCalendar } from '@features/dashboard/hooks/useConstructionsCalendar';
import SummaryCard from '@features/dashboard/components/SummaryCard';
import RecentMovementsTable from '@features/dashboard/components/RecentMovementsTable';
import ClientsMiniTable from '@features/dashboard/components/ClientsMiniTable';
import ConstructionCalendar from '@features/dashboard/components/ConstructionCalendar';

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const { data: summaryResponse, isLoading: summaryLoading } = useMovementsSummary();
  const { data: movementsResponse, isLoading: movementsLoading } = useRecentMovements();
  const { data: clientsResponse, isLoading: clientsLoading } = useClientsSummary();
  const { data: constructionsResponse, isLoading: constructionsLoading } = useConstructionsCalendar();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['movementsSummary'] });
    queryClient.invalidateQueries({ queryKey: ['recentMovements'] });
  }, [queryClient]);

  const summary = summaryResponse?.data;
  const movements = movementsResponse?.data?.items || [];
  const clients = clientsResponse?.data?.items || [];
  const constructions = constructionsResponse?.data?.items || [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant='h4' fontWeight={600} gutterBottom>
        Resumen general del sistema
      </Typography>
      <Typography variant='body1' color='text.secondary' mb={4}>
        Vista panorámica de operaciones y actividades
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        <SummaryCard
          title='Total Ingresos'
          value={summary?.totalIncome || 0}
          icon={<TrendingUp fontSize='large' />}
          color='success'
          isLoading={summaryLoading}
        />
        <SummaryCard
          title='Total Egresos'
          value={summary?.totalExpense || 0}
          icon={<TrendingDown fontSize='large' />}
          color='error'
          isLoading={summaryLoading}
        />
        <SummaryCard
          title='Balance Neto'
          value={summary?.netBalance || 0}
          icon={<AccountBalance fontSize='large' />}
          color='info'
          isLoading={summaryLoading}
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 3,
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant='h6' fontWeight={600} gutterBottom>
            Clientes Recientes
          </Typography>
          <Typography variant='body2' color='text.secondary' mb={3}>
            Últimos clientes registrados
          </Typography>
          <ClientsMiniTable
            clients={clients}
            isLoading={clientsLoading}
          />
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant='h6' fontWeight={600} gutterBottom>
            Obras del Mes 📅
          </Typography>
          <Typography variant='body2' color='text.secondary' mb={3}>
            Eventos y obras planificadas
          </Typography>
          <ConstructionCalendar
            constructions={constructions}
            isLoading={constructionsLoading}
          />
        </Paper>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, border: 1, borderColor: 'divider' }}>
        <Typography variant='h6' fontWeight={600} gutterBottom>
          Movimientos Recientes
        </Typography>
        <Typography variant='body2' color='text.secondary' mb={3}>
          Últimas transacciones registradas
        </Typography>
        <RecentMovementsTable
          movements={movements}
          isLoading={movementsLoading}
        />
      </Paper>
    </Box>
  );
}
