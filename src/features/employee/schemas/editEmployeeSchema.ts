import * as yup from 'yup';

export const editEmployeeSchema = yup.object({
  dni: yup
    .number()
    .typeError('El DNI debe ser un número válido')
    .required('El DNI es requerido')
    .min(1000000, 'DNI debe tener al menos 7 dígitos')
    .max(99999999, 'DNI debe tener máximo 8 dígitos'),
  firstName: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'Mínimo 2 caracteres'),
  lastName: yup
    .string()
    .required('El apellido es requerido')
    .min(2, 'Mínimo 2 caracteres'),
  workStation: yup
    .string()
    .required('El puesto de trabajo es requerido')
    .min(2, 'Mínimo 2 caracteres'),
});

export type EditEmployeeFormData = yup.InferType<typeof editEmployeeSchema>;
