import React, { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import PopupMenu, { PopupMenuItem } from './PopupMenu';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  isActive?: boolean;
  variant?: 'default' | 'error';
  popupItems?: PopupMenuItem[];
  onPopupItemClick?: (item: PopupMenuItem) => void;
}

export default function SidebarItem({
  icon,
  text,
  onClick,
  isActive = false,
  variant = 'default',
  popupItems,
  onPopupItemClick,
}: SidebarItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (popupItems && popupItems.length > 0) {
      setAnchorEl(event.currentTarget);
      setPopupOpen(true);
    } else if (onClick) {
      onClick();
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setAnchorEl(null);
  };

  const handlePopupItemClick = (item: PopupMenuItem) => {
    if (onPopupItemClick) {
      onPopupItemClick(item);
    }
    handlePopupClose();
  };
  const getIconColor = () => {
    if (variant === 'error') return 'error.main';
    return (theme: any) =>
      theme.palette.mode === 'dark' ? '#e1e5e9' : '#000000';
  };

  const getTextColor = () => {
    if (variant === 'error') return 'error.main';
    return undefined;
  };

  const getHoverColor = () => {
    if (variant === 'error') {
      return (theme: any) =>
        theme.palette.mode === 'dark'
          ? 'rgba(244, 67, 54, 0.2)'
          : 'rgba(255, 255, 255, 0.9)';
    }
    return (theme: any) =>
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(255, 255, 255, 0.9)';
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleClick}
          sx={{
            flexDirection: 'column',
            textAlign: 'center',
            py: 0,
            px: 0,
            minHeight: 30,
            mx: 0,
            mb: 0,
            '&:hover': {
              bgcolor: 'transparent',
              '& .sidebar-icon-container': {
                bgcolor: getHoverColor(),
              },
            },
            opacity: isActive ? 1 : 0.7,
          }}
        >
          <Box
            className='sidebar-icon-container'
            sx={{
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 0.5,
              transition: 'background-color 0.2s ease',
              '&:hover': {
                bgcolor: getHoverColor(),
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                color: getIconColor(),
                fontSize: '1.3rem',
              }}
            >
              {icon}
            </ListItemIcon>
          </Box>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              fontSize: 11,
              fontWeight: 'medium',
              color: getTextColor(),
            }}
          />
        </ListItemButton>
      </ListItem>

      {popupItems && popupItems.length > 0 && (
        <PopupMenu
          anchorEl={anchorEl}
          open={popupOpen}
          onClose={handlePopupClose}
          items={popupItems}
          onItemClick={handlePopupItemClick}
        />
      )}
    </>
  );
}
