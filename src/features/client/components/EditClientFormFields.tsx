import { Control, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormTextField } from '@shared/components/FormTextField';
import { EditClientFormData } from '@features/client/schemas/editClientSchema';

interface EditClientFormFieldsProps {
  control: Control<EditClientFormData>;
}

export default function EditClientFormFields({
  control,
}: EditClientFormFieldsProps) {
  return (
    <>
      <Controller
        name='dni'
        control={control}
        render={({ field: { onChange, value, ...field }, fieldState }) => (
          <TextField
            {...field}
            label='DNI *'
            type='number'
            fullWidth
            variant='outlined'
            disabled
            value={value ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              onChange(val === '' ? undefined : Number(val));
            }}
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: 2,
                },
              },
              '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                  fontWeight: 600,
                },
              },
            }}
          />
        )}
      />

      <FormTextField name='firstName' control={control} label='Nombre *' />

      <FormTextField name='address' control={control} label='Dirección *' />
    </>
  );
}
