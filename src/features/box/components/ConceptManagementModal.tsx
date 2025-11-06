import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Close,
  Add,
  Edit,
  Delete,
  Category,
  Search,
} from '@mui/icons-material';
import { useConcepts } from '@features/box/hooks/useConcepts';
import { useDeleteConcept } from '@features/box/hooks/useDeleteConcept';
import { useToast } from '@shared/hooks/useToast';
import { useDebounce } from '@shared/hooks/useDebounce';
import ConfirmDialog from '@shared/components/ConfirmDialog';
import { Concept } from '@features/box/types';
import ConceptFormDialog from '@features/box/components/ConceptFormDialog';

interface ConceptManagementModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ConceptManagementModal({
  open,
  onClose,
}: ConceptManagementModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [conceptFormOpen, setConceptFormOpen] = useState(false);
  const [editingConcept, setEditingConcept] = useState<Concept | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    concept: Concept | null;
  }>({
    open: false,
    concept: null,
  });

  const { showToast } = useToast();
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, isLoading } = useConcepts({
    q: debouncedSearch || undefined,
    pageSize: 100,
    pageIndex: 1,
  });

  const deleteMutation = useDeleteConcept();

  const concepts: Concept[] = data?.data || [];

  const handleCreateConcept = () => {
    setEditingConcept(null);
    setConceptFormOpen(true);
  };

  const handleEditConcept = (concept: Concept) => {
    setEditingConcept(concept);
    setConceptFormOpen(true);
  };

  const handleDeleteConcept = (concept: Concept) => {
    setDeleteDialog({ open: true, concept });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.concept) return;

    try {
      await deleteMutation.mutateAsync(deleteDialog.concept.id);
      showToast('Concepto eliminado exitosamente', 'success');
      setDeleteDialog({ open: false, concept: null });
    } catch {
      showToast('Error al eliminar el concepto', 'error');
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ open: false, concept: null });
  };

  const handleCloseConceptForm = () => {
    setConceptFormOpen(false);
    setEditingConcept(null);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth='md'
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Category color='primary' />
            <Typography variant='h6' fontWeight={600}>
              Gestión de Conceptos
            </Typography>
          </Box>
          <IconButton onClick={onClose} size='small'>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder='Buscar conceptos...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size='small'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant='contained'
              startIcon={<Add />}
              onClick={handleCreateConcept}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                minWidth: 'fit-content',
                whiteSpace: 'nowrap',
              }}
            >
              Crear Concepto
            </Button>
          </Box>

          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 8,
              }}
            >
              <CircularProgress />
            </Box>
          ) : concepts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant='body1' color='text.secondary'>
                {searchQuery
                  ? 'No se encontraron conceptos'
                  : 'No hay conceptos registrados'}
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight={600}>Nombre</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>Tipo</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>Descripción</Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography fontWeight={600}>Acciones</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {concepts.map((concept) => (
                    <TableRow key={concept.id} hover>
                      <TableCell>
                        <Typography variant='body2'>{concept.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            concept.type === 'ingreso' ? 'Ingreso' : 'Egreso'
                          }
                          size='small'
                          color={
                            concept.type === 'ingreso' ? 'success' : 'error'
                          }
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{
                            maxWidth: 250,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {concept.description || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell align='right'>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            justifyContent: 'flex-end',
                          }}
                        >
                          <IconButton
                            size='small'
                            onClick={() => handleEditConcept(concept)}
                            color='primary'
                          >
                            <Edit fontSize='small' />
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => handleDeleteConcept(concept)}
                            color='error'
                          >
                            <Delete fontSize='small' />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={onClose}
            variant='outlined'
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <ConceptFormDialog
        open={conceptFormOpen}
        onClose={handleCloseConceptForm}
        concept={editingConcept}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        title='Confirmar eliminación'
        message={
          deleteDialog.concept
            ? `¿Estás seguro de que deseas eliminar el concepto "${deleteDialog.concept.name}"? Esta acción no se puede deshacer.`
            : ''
        }
        confirmText={deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
        cancelText='Cancelar'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        severity='error'
      />
    </>
  );
}
