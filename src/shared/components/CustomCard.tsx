import { Card, CardContent, CardProps, useTheme } from '@mui/material';
import { forwardRef, ReactNode } from 'react';

interface CustomCardProps extends CardProps {
  children: ReactNode;
  padding?: number | string;
}

export const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>(
  ({ children, padding = 3, sx, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        sx={{
          borderRadius: 3,
          boxShadow: theme.shadows[8],
          border: `1px solid ${theme.palette.divider}`,
          ...sx,
        }}
        {...props}
      >
        <CardContent sx={{ p: padding, '&:last-child': { pb: padding } }}>
          {children}
        </CardContent>
      </Card>
    );
  }
);

CustomCard.displayName = 'CustomCard';
