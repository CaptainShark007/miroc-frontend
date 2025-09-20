import * as yup from 'yup';

export const createUserSchema = yup.object({
  dni: yup
    .number()
    .typeError('El DNI debe ser un número válido')
    .required('El DNI es requerido')
    .min(1000000, 'DNI debe tener al menos 7 dígitos')
    .max(99999999, 'DNI debe tener máximo 8 dígitos'),
  email: yup
    .string()
    .required('El email es requerido')
    .email('Email no válido'),
  firstName: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'Mínimo 2 caracteres'),
  lastName: yup
    .string()
    .required('El apellido es requerido')
    .min(2, 'Mínimo 2 caracteres'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'Mínimo 6 caracteres'),
  role: yup
    .string()
    .required('El rol es requerido')
    .oneOf(['PRESUPUESTISTA'], 'Rol no válido'),
});

export type CreateUserFormData = yup.InferType<typeof createUserSchema>;
