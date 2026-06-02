import React, { useState } from 'react';
import { Container, CircularProgress, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { Popup, Form as GenericForm, loginContainer, useService, useToast } from 'fog-ui';
import { CustomButton } from 'fog-ui';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import { loginFormFields } from '../../Forms/UserManagement';
import { UserAPI } from '../../api'; // ✅ Using standardized UserAPI

const Login: React.FC = () => {
  const theme = useTheme();
  const styles = loginContainer(theme);
  const navigate = useNavigate();

  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);
  const toast = useToast();

  // ✅ Popup state
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isForgotPasswordPopupOpen, setIsForgotPasswordPopupOpen] = useState(false);

  // ✅ Login state
  const [loading, setLoading] = useState(false);

  // ✅ Handle Login via UserAPI
  const handleLogin = async (formData: { [key: string]: any }) => {
    setLoading(true);

    try {
      const result = await userAPI.login({
        email: formData.email,
        password: formData.password,
      });

      // ✅ result is the wrapped AuthResponse
      if (result && result.data) {
        const { user, accessToken, refreshToken } = result.data;

        localStorage.setItem('userId', user.id);
        if (user.tenantId) {
          localStorage.setItem('tenantId', user.tenantId);
        }
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        toast.success(`Welcome back, ${user.email}!`);
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Login failed.';
      toast.error(message);
      console.error('Error during login:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Custom action buttons
  const customButtons: CustomButton[] = [
    {
      text: 'Register',
      onClick: () => setIsRegisterPopupOpen(true),
      color: 'primary',
      variant: 'contained',
    },
    {
      text: 'Forgot Password?',
      onClick: () => setIsForgotPasswordPopupOpen(true),
      color: 'primary',
    },
  ];

  return (
    <Container maxWidth="sm" sx={styles.root}>
      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Logging in...
          </Typography>
        </Box>
      ) : (
        <>
          <GenericForm
            fields={loginFormFields}
            onSubmit={handleLogin}
            submitButtonText={'Login'}
            customButtons={customButtons}
          />
        </>
      )}

      <Popup
        title="Register an account"
        open={isRegisterPopupOpen}
        onClose={() => setIsRegisterPopupOpen(false)}
        component={
          <Register
            onSuccess={() => {
              setIsRegisterPopupOpen(false);
              navigate('/dashboard');
            }}
          />
        }
      />

      <Popup
        title="Forgot Password?"
        open={isForgotPasswordPopupOpen}
        onClose={() => setIsForgotPasswordPopupOpen(false)}
        component={
          <ForgotPassword
            onSuccess={() => {
              setIsForgotPasswordPopupOpen(false);
            }}
          />
        }
      />
    </Container>
  );
};

export default Login;
