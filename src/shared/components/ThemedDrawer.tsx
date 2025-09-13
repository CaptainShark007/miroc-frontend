import React from 'react';
import { Drawer, DrawerProps } from '@mui/material';

interface ThemedDrawerProps extends Omit<DrawerProps, 'sx'> {
  width: number;
  headerHeight: number;
  children: React.ReactNode;
  variant?: 'temporary' | 'permanent';
}

export default function ThemedDrawer({
  width,
  headerHeight,
  children,
  variant = 'temporary',
  ...props
}: ThemedDrawerProps) {
  const getDisplayStyles = () => {
    if (variant === 'permanent') {
      return { xs: 'none', sm: 'block' };
    }
    return { xs: 'block', sm: 'none' };
  };

  const getContainerStyles = () => {
    if (variant === 'permanent') {
      return {
        display: getDisplayStyles(),
        width: width,
        flexShrink: 0,
      };
    }
    return {
      display: getDisplayStyles(),
    };
  };

  return (
    <Drawer
      {...props}
      variant={variant}
      sx={{
        ...getContainerStyles(),
        '& .MuiDrawer-paper': {
          width: width,
          top: `${headerHeight}px`,
          height: `calc(100% - ${headerHeight}px)`,
          boxSizing: 'border-box',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#1a2332' : '#26c6da',
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#e1e5e9' : '#000000',
          borderRadius: '0 20px 20px 0',
        },
      }}
    >
      {children}
    </Drawer>
  );
}
