import { AppBar, Toolbar, Box, IconButton, Typography } from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  LocationCity,
  NotificationsNone,
} from '@mui/icons-material';
import Tooltip from '@/shared/components/Tooltip';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  headerHeight?: number;
}

export default function DashboardHeader({
  onMenuClick,
  headerHeight = 64,
}: DashboardHeaderProps) {
  return (
    <AppBar
      position='fixed'
      sx={{
        height: headerHeight,
        justifyContent: 'center',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'background.default',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
      elevation={0}
    >
      <Toolbar sx={{ minHeight: headerHeight, gap: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            minWidth: { xs: 120, sm: 160 },
          }}
        >
          <IconButton
            onClick={onMenuClick}
            edge='start'
            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant='h6' fontWeight={700}>
              LOGO
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton aria-label='perfil'>
            <AccountCircle />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <LocationCity fontSize='small' />
            <Typography variant='subtitle2' fontWeight={700}>
              MIROC S.R.L.
            </Typography>
          </Box>

          <Tooltip title='Próximamente'>
            <IconButton aria-label='notificaciones'>
              <NotificationsNone />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
