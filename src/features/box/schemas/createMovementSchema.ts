import * as yup from 'yup';

export const createMovementSchema = yup.object({
  amount: yup
    .number()
    .typeError('El monto debe ser un número válido')
    .required('El monto es requerido')
    .min(0.01, 'El monto debe ser mayor a 0'),
  paymentMethod: yup.string().required('El método de pago es requerido'),
  conceptId: yup
    .number()
    .typeError('El concepto debe ser un número válido')
    .required('El concepto es requerido')
    .min(1, 'El concepto es requerido'),
  clientDni: yup.number().nullable(),
  providerCuit: yup.number().nullable(),
  employeeDni: yup.number().nullable(),
  constructionName: yup.string().nullable(),
});

export type CreateMovementFormData = yup.InferType<typeof createMovementSchema>;
