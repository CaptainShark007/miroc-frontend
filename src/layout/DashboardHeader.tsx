import { AppBar, Toolbar, Box, IconButton, Typography } from '@mui/material';
import {
  Menu as MenuIcon,
  LocationCity,
  NotificationsNone,
  SupervisorAccount,
  Security,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@shared/components/Tooltip';
import { useAuth } from '@shared/hooks/useAuth';
import UserPermissionsModal from '@features/admin/components/UserPermissionsModal';
import { useUserActions } from '@features/admin/hooks/useUserActions';
import LogoPng from '@assets/logo.png';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  headerHeight?: number;
}

export default function DashboardHeader({
  onMenuClick,
  headerHeight = 64,
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { permissionsDialog, handleManagePermissions, handleClosePermissions } =
    useUserActions();

  const handleAdminClick = () => {
    navigate('/admin/users');
  };
  return (
    <>
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
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <img 
                src={LogoPng} 
                alt='NEXOBRA Logo' 
                style={{ height: '50px', width: 'auto' }}
              />
              <Typography 
                variant='h5' 
                fontWeight={700}
                sx={{ 
                  letterSpacing: 1.5,
                  background: 'linear-gradient(135deg, #1565C0 0%, #43A047 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                NEXOBRAS
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <LocationCity fontSize='small' />
              <Typography variant='subtitle2' fontWeight={700}>
                MIROC S.R.L.
              </Typography>
            </Box>

            {/* <IconButton aria-label='perfil'>
            <AccountCircle />
          </IconButton> */}

            {isAdmin() && (
              <Tooltip title='Administrador de Usuarios'>
                <IconButton
                  aria-label='administrador'
                  onClick={handleAdminClick}
                >
                  <SupervisorAccount />
                </IconButton>
              </Tooltip>
            )}

            {isAdmin() && (
              <Tooltip title='Gestión de Permisos'>
                <IconButton
                  aria-label='permisos'
                  onClick={handleManagePermissions}
                >
                  <Security />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title='Próximamente'>
              <IconButton aria-label='notificaciones'>
                <NotificationsNone />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <UserPermissionsModal
        open={permissionsDialog.open}
        onClose={handleClosePermissions}
      />
    </>
  );
}
