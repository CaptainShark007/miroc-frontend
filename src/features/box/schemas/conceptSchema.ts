import * as yup from 'yup';

export const conceptSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  type: yup
    .mixed<'ingreso' | 'egreso'>()
    .required('El tipo es requerido')
    .oneOf(['ingreso', 'egreso'], 'El tipo debe ser ingreso o egreso'),
});

export type ConceptFormData = yup.InferType<typeof conceptSchema>;
