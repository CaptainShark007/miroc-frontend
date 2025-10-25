import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useFormWithSchema } from '@shared/hooks/useFormWithSchema';
import {
  editEmployeeSchema,
  EditEmployeeFormData,
} from '@features/employee/schemas/editEmployeeSchema';
import { useUpdateEmployee } from '@features/employee/hooks/useUpdateEmployee';
import { useEmployeeByDni } from '@features/employee/hooks/useEmployeeByDni';
import EditEmployeeHeader from '@features/employee/components/EditEmployeeHeader';
import EditEmployeeFormFields from '@features/employee/components/EditEmployeeFormFields';
import EditEmployeeActions from '@features/employee/components/EditEmployeeActions';
import { useToast } from '@shared/hooks/useToast';
import { createPatchOperations } from '@shared/utils/jsonPatch';
import type { Employee } from '@features/employee/types';

export default function EditEmployeePage() {
  const navigate = useNavigate();
  const { dni } = useParams<{ dni: string }>();
  const updateEmployeeMutation = useUpdateEmployee();
  const { showToast } = useToast();

  const { data, isLoading, error } = useEmployeeByDni(dni);

  const employee: Employee | null = useMemo(() => {
    const employeeData = data?.data;
    if (employeeData) {
      return {
        dni: employeeData.dni,
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        workStation: employeeData.workStation,
      };
    }
    return null;
  }, [data]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useFormWithSchema<EditEmployeeFormData>({
    schema: editEmployeeSchema,
    defaultValues: {
      dni: undefined,
      firstName: '',
      lastName: '',
      workStation: '',
    },
  });

  useEffect(() => {
    if (employee) {
      reset({
        dni: employee.dni,
        firstName: employee.firstName,
        lastName: employee.lastName,
        workStation: employee.workStation,
      });
    }
  }, [employee, reset]);

  useEffect(() => {
    if (!dni) {
      showToast('DNI de empleado no válido', 'error');
      navigate('/entities/employees');
      return;
    }

    if (error) {
      showToast('Error al cargar el empleado', 'error');
      navigate('/entities/employees');
      return;
    }

    if (!isLoading && !employee && dni) {
      showToast(`Empleado con DNI "${dni}" no encontrado`, 'error');
      navigate('/entities/employees');
    }
  }, [dni, employee, isLoading, error, navigate, showToast]);

  const onSubmit = (data: EditEmployeeFormData) => {
    if (!employee) return;

    // Crear el objeto actualizado combinando empleado actual con datos del formulario
    const updatedEmployee: Employee = {
      ...employee,
      ...data,
    };

    const operations = createPatchOperations(
      employee,
      updatedEmployee,
      [],
      true
    );

    if (operations.length === 0) {
      showToast('No hay cambios para guardar', 'info');
      return;
    }

    updateEmployeeMutation.mutate(
      {
        dni: employee.dni,
        ops: operations,
      },
      {
        onSuccess: () => {
          navigate('/entities/employees');
        },
      }
    );
  };

  const handleBack = () => {
    navigate('/entities/employees');
  };

  if (!employee && isLoading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <Typography>Cargando datos del empleado...</Typography>
      </Box>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <EditEmployeeHeader
        onBack={handleBack}
        employeeName={`${employee.firstName} ${employee.lastName}`}
      />

      <Paper
        sx={{
          p: 4,
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
          }}
        >
          <EditEmployeeFormFields control={control} />
          <EditEmployeeActions
            onCancel={handleBack}
            isLoading={updateEmployeeMutation.isPending}
            isValid={isValid}
          />
        </Box>
      </Paper>
    </Box>
  );
}
