import React from 'react';
import { List, Box } from '@mui/material';
import {
  Home,
  PointOfSale,
  People,
  Inventory,
  BarChart,
  Settings,
  Logout,
  Construction,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@app/store';
import { clearToken } from '@features/auth/slices/auth.slice';
import { useToast } from '@shared/hooks/useToast';
import SidebarItem from '@shared/components/SidebarItem';
import SidebarDivider from '@shared/components/SidebarDivider';
import ThemedDrawer from '@shared/components/ThemedDrawer';
import { PopupMenuItem } from '@shared/components/PopupMenu';
import { removeLocalStorage } from '@shared/utils/localStorage';
import { STORAGE_KEYS } from '@shared/constants/redux';

const drawerWidth = 100;

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
  container?: () => HTMLElement;
  headerHeight?: number;
  drawerWidth?: number;
}

const menuItems = [
  { text: 'Panel', icon: <Home />, path: '/dashboard' },
  { text: 'Entidades', icon: <People /> },
  { text: 'Caja', icon: <PointOfSale />, path: '/box' },
  { text: 'Obras', icon: <Construction />, path: '/works' },
  { text: 'Inventario', icon: <Inventory />, path: '/stock' },
  { text: 'Reportes', icon: <BarChart />, path: '/reports' },
];

const entitiesPopupItems: PopupMenuItem[] = [
  {
    text: 'Clientes',
    path: '/entities/clients',
  },
  {
    text: 'Proveedores',
    path: '/entities/suppliers',
  },
  {
    text: 'Empleados',
    path: '/entities/employees',
  },
];

export default function DashboardSidebar({
  mobileOpen,
  onClose,
  container,
  headerHeight = 64,
  drawerWidth: customDrawerWidth = drawerWidth,
}: DashboardSidebarProps) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(clearToken());
    removeLocalStorage(STORAGE_KEYS.AUTH);
    showToast('Sesión cerrada exitosamente', 'success');
    navigate('/');
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      navigate(path);
      if (onClose) onClose();
    }
  };

  const handlePopupItemClick = (item: PopupMenuItem) => {
    if (item.path) {
      navigate(item.path);
      if (onClose) onClose();
    }
  };

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: 0.5,
        py: 1,
      }}
    >
      <Box>
        <List sx={{ py: 0 }}>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <SidebarItem
                icon={item.icon}
                text={item.text}
                onClick={() => handleNavigation(item.path)}
                isActive={location.pathname === item.path}
                popupItems={
                  item.text === 'Entidades' ? entitiesPopupItems : undefined
                }
                onPopupItemClick={
                  item.text === 'Entidades' ? handlePopupItemClick : undefined
                }
              />
              {index < menuItems.length - 1 && <SidebarDivider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box>
        <SidebarDivider spacing='medium' />
        <List sx={{ py: 0 }}>
          <SidebarItem
            icon={<Settings />}
            text='Configuración'
            onClick={() => handleNavigation('/configuration')}
            isActive={location.pathname === '/configuration'}
          />
          <SidebarDivider />
          <SidebarItem
            icon={<Logout />}
            text='Cerrar Sesión'
            onClick={handleLogout}
            variant='error'
          />
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {mobileOpen !== undefined && (
        <ThemedDrawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={onClose}
          width={customDrawerWidth}
          headerHeight={headerHeight}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerContent}
        </ThemedDrawer>
      )}

      <ThemedDrawer
        variant='permanent'
        width={customDrawerWidth}
        headerHeight={headerHeight}
      >
        {drawerContent}
      </ThemedDrawer>
    </>
  );
}
