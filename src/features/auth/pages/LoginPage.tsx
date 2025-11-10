// import { useNavigate } from 'react-router-dom';
import { CustomCard } from '@shared/components/CustomCard';
import { LoginHeader } from '../components/LoginHeader';
import { LoginForm } from '../components/LoginForm';
import { LoginLayout } from '../components/LoginLayout';
import { LoginFormData } from '../schemas/loginSchema';
import { useLogin } from '../hooks/useLogin';

export default function LoginPage() {
  // const navigate = useNavigate();
  const { mutate: loginUser, isPending: loading } = useLogin();

  const handleLogin = async (formData: LoginFormData) => {
    loginUser({
      email: formData.email,
      password: formData.password,
    });
  };

  // const handleForgotPassword = () => {
  //   navigate('/forgot-password');
  // };

  return (
    <LoginLayout>
      <CustomCard sx={{ width: '100%', maxWidth: 480 }}>
        <LoginHeader
          title='Bienvenido de nuevo'
          subtitle='Ingresa tus credenciales para acceder a tu cuenta'
        />

        <LoginForm
          onSubmit={handleLogin}
          loading={loading}
          // onForgotPassword={handleForgotPassword}
        />
      </CustomCard>
    </LoginLayout>
  );
}
