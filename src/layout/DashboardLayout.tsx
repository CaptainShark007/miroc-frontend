import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from '@layout/DashboardSidebar';

const DRAWER_WIDTH = 100;
const HEADER_HEIGHT = 64;

interface DashboardLayoutProps {
  window?: () => Window;
}

export default function DashboardLayout({ window }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <DashboardHeader
        onMenuClick={handleDrawerToggle}
        headerHeight={HEADER_HEIGHT}
      />

      <Box
        component='nav'
        sx={{
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 },
        }}
        aria-label='menu lateral'
      >
        <DashboardSidebar
          mobileOpen={mobileOpen}
          onClose={handleDrawerToggle}
          container={container}
          headerHeight={HEADER_HEIGHT}
          drawerWidth={DRAWER_WIDTH}
        />
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: `${HEADER_HEIGHT}px`,
          py: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
