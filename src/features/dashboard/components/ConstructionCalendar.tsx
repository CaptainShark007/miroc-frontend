import { Box, Typography, Chip, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import type { Construction } from '@features/construction/types';
import { getConstructionStatus } from '@features/construction/utils/constructionStatus';

interface ConstructionCalendarProps {
  constructions: Construction[];
  isLoading: boolean;
}

export default function ConstructionCalendar({
  constructions,
  isLoading,
}: ConstructionCalendarProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return dateString;
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  };

  const getStatusColor = (status: string) => {
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

  if (isLoading) {
    return (
      <Box display='flex' justifyContent='center' p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (constructions.length === 0) {
    return (
      <Box p={4} textAlign='center'>
        <Typography color='text.secondary' variant='body2'>
          No hay obras programadas este mes
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1.5,
          maxHeight: 380,
          overflow: 'auto',
          pr: 0.5,
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          p: 1.5,
        }}
      >
      {constructions.map((construction, index) => {
        const status = getConstructionStatus(construction.startDate, construction.endDate);
        return (
          <Box
            key={`${construction.name}-${construction.startDate}-${construction.clientDni}-${index}`}
            sx={{
              p: 1.5,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1.5,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'action.hover',
              },
            }}
            onClick={() => navigate('/works')}
          >
            <Box display='flex' justifyContent='space-between' alignItems='start' mb={0.5}>
              <Typography variant='body2' fontWeight={600} sx={{ flex: 1, fontSize: '0.875rem' }}>
                {construction.name}
              </Typography>
              <Chip
                label={status.label}
                size='small'
                color={getStatusColor(status.status) as any}
                variant='outlined'
                sx={{ fontWeight: 500, fontSize: '0.65rem', height: '20px' }}
              />
            </Box>
            
            <Typography variant='caption' color='text.secondary' display='block' sx={{ fontSize: '0.7rem' }}>
              {construction.address}
            </Typography>
            
            <Box display='flex' gap={1.5} mt={0.5}>
              <Typography variant='caption' color='text.secondary' sx={{ fontSize: '0.7rem' }}>
                📅 {formatDate(construction.startDate)}
                {construction.endDate && ` - ${formatDate(construction.endDate)}`}
              </Typography>
            </Box>
          </Box>
          );
        })}
      </Box>
      <Box display='flex' justifyContent='center' mt={2}>
        <Button
          variant='outlined'
          endIcon={<ArrowForward />}
          onClick={() => navigate('/works')}
        >
          Ver todas las obras
        </Button>
      </Box>
    </Box>
  );
}