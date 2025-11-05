import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

interface EditConstructionHeaderProps {
  onBack: () => void;
  constructionName: string;
}

export default function EditConstructionHeader({
  onBack,
  constructionName,
}: EditConstructionHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <IconButton onClick={onBack} sx={{ color: 'primary.main' }}>
        <ArrowBack />
      </IconButton>
      <Box>
        <Typography variant='h4' fontWeight={600}>
          Editar Obra
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {constructionName}
        </Typography>
      </Box>
    </Box>
  );
}
