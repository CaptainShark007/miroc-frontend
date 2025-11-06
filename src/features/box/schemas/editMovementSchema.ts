import * as yup from 'yup';

export const editMovementSchema = yup.object({
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
  clientId: yup.string().nullable(),
  providerId: yup.string().nullable(),
  employeeId: yup.string().nullable(),
  constructionId: yup.string().nullable(),
});

export type EditMovementFormData = yup.InferType<typeof editMovementSchema>;
