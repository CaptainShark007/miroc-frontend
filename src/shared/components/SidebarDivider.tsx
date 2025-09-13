import { Divider } from '@mui/material';

interface SidebarDividerProps {
  spacing?: 'small' | 'medium' | 'large';
}

export default function SidebarDivider({
  spacing = 'small',
}: SidebarDividerProps) {
  const getSpacing = () => {
    switch (spacing) {
      case 'medium':
        return { mx: 1, my: 0.5 };
      case 'large':
        return { mx: 1, my: 1 };
      default:
        return { mx: 1, my: 0.25 };
    }
  };

  return (
    <Divider
      sx={{
        ...getSpacing(),
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.8)',
      }}
    />
  );
}
