import { Box, Link, Stack } from '@mui/material';
import { LoadingButton } from '@/shared/components/LoadingButton';
import { FormTextField } from '@/shared/components/FormTextField';
import { FormPasswordField } from '@/shared/components/FormPasswordField';
import { useFormWithSchema } from '@/shared/hooks/useFormWithSchema';
import { loginSchema, LoginFormData } from '../schemas/loginSchema';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
  onForgotPassword?: () => void;
}

export const LoginForm = ({
  onSubmit,
  loading = false,
  onForgotPassword,
}: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormWithSchema<LoginFormData>({
    schema: loginSchema,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onFormSubmit = (data: LoginFormData) => {
    onSubmit(data);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onFormSubmit)}
      sx={{ width: '100%' }}
    >
      <Stack spacing={3}>
        <FormTextField
          name='email'
          control={control}
          label='Correo Electrónico'
          type='email'
          disabled={loading}
          autoComplete='email'
          autoFocus
        />

        <FormPasswordField
          name='password'
          control={control}
          label='Contraseña'
          disabled={loading}
          autoComplete='current-password'
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {onForgotPassword && (
            <Link
              component='button'
              type='button'
              onClick={onForgotPassword}
              sx={{ textDecoration: 'none', fontSize: '0.875rem' }}
              disabled={loading}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          )}
        </Box>

        <LoadingButton
          type='submit'
          variant='contained'
          size='large'
          loading={loading}
          loadingText='Iniciando sesión...'
          fullWidth
          disabled={!isValid}
          sx={{ mt: 1 }}
        >
          Iniciar Sesión
        </LoadingButton>
      </Stack>
    </Box>
  );
};
