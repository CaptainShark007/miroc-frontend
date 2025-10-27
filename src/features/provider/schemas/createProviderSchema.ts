import * as yup from 'yup';

export const createProviderSchema = yup.object({
  cuit: yup
    .number()
    .typeError('El CUIT debe ser un número válido')
    .required('El CUIT es requerido')
    .min(10000000000, 'CUIT debe tener 11 dígitos')
    .max(99999999999, 'CUIT debe tener 11 dígitos'),
  firstName: yup
    .string()
    .required('El nombre es requerido')
    .min(2, 'Mínimo 2 caracteres'),
  address: yup.string(),
  description: yup.string(),
});

export type CreateProviderFormData = yup.InferType<typeof createProviderSchema>;
