import * as yup from 'yup';

export const editConstructionSchema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  startDate: yup.string().required('La fecha de inicio es obligatoria'),
  endDate: yup
    .string()
    .required('La fecha de fin es obligatoria')
    .test(
      'is-after-start',
      'La fecha de fin debe ser posterior a la fecha de inicio',
      function (value) {
        const { startDate } = this.parent;
        return !startDate || !value || new Date(value) >= new Date(startDate);
      }
    ),
  address: yup.string().required('La dirección es obligatoria'),
  description: yup
    .string()
    .max(500, 'La descripción no puede superar los 500 caracteres'),
  clientDni: yup
    .number()
    .typeError('El DNI del cliente debe ser un número')
    .required('El DNI del cliente es obligatorio'),
});

export type EditConstructionFormData = yup.InferType<
  typeof editConstructionSchema
>;
