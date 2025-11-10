import * as yup from 'yup';

export const editClientSchema = yup.object({
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
  address: yup
    .string()
    .required('La dirección es requerida')
    .min(5, 'Mínimo 5 caracteres'),
});

export type EditClientFormData = yup.InferType<typeof editClientSchema>;
