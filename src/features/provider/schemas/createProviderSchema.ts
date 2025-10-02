import * as yup from 'yup';

export const createProviderSchema = yup.object({
    cuit: yup
        .number()
        .typeError('El CUIT debe ser un número válido')
        .required('El CUIT es requerido')
        .min(1000000000, 'CUIT debe tener al menos 10 dígitos')
        .max(99999999999, 'CUIT debe tener máximo 11 dígitos'),
    firstName: yup
        .string()
        .required('El nombre es requerido')
        .min(2, 'Mínimo 2 caracteres'),
    address: yup
        .string()
        .required('La dirección es requerida')
        .min(2, 'Mínimo 2 caracteres'),
    description: yup
        .string()
        .required('La descripción es requerida')
        .min(2, 'Mínimo 2 caracteres'),
});

export type CreateProviderFormData = yup.InferType<typeof createProviderSchema>;