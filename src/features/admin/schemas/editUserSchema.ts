import * as yup from 'yup';

export const editUserSchema = yup.object({
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
    .optional()
    .test('password-length', 'Mínimo 6 caracteres', function (value) {
      if (value && value.length > 0) {
        return value.length >= 6;
      }
      return true;
    }),
  role: yup
    .string()
    .required('El rol es requerido')
    .oneOf(['PRESUPUESTISTA', 'ADMIN'], 'Rol no válido'),
});

export type EditUserFormData = yup.InferType<typeof editUserSchema>;
