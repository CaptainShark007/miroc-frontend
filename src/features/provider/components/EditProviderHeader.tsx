import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';

interface EditProviderHeaderProps {
  onBack: () => void;
  providerName: string;
}

export default function EditProviderHeader({
  onBack,
  providerName,
}: EditProviderHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <IconButton
        onClick={onBack}
        sx={{
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <ArrowBack />
      </IconButton>
      <Edit sx={{ fontSize: 32, color: 'primary.main' }} />
      <Typography variant='h4' fontWeight={600}>
        Editar Proveedor: {providerName}
      </Typography>
    </Box>
  );
}
