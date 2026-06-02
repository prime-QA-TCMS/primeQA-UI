import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Form as GenericForm, useService, useToast } from 'fog-ui';
import type { FormField } from 'fog-ui';
import { UserAPI } from '../../../api';
import type { RegisterRequest } from '../../../types';

interface RegisterProps {
  onSuccess?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData: { [key: string]: any }) => {
    setLoading(true);

    try {
      // TODO: Both roleId and tenantId are hardcoded. 
      // In the future, these should be dynamic or default to appropriate values.
      const registerData: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        roleId: '69037d7e04c235dfa038bc3a', // Default admin role
        tenantId: '6977c5e4ea7e71a947e74e78', // Default tenant
      };

      console.log('Register data being sent:', registerData);
      const result = await userAPI.register(registerData);

      if (result && result.data) {
        toast.success(`Welcome! Your account has been created.`);

        // Note: Register response doesn't include tokens, 
        // user needs to login separately
        const { data } = result;

        // Call success callback if provided
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 1500);
        }
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      toast.error(message);
      console.error('Error during registration:', err);
    } finally {
      setLoading(false);
    }
  };

  const registerFields: FormField[] = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      minLength: 6,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      required: true,
      minLength: 6,
    },
  ];

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Creating your account...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <GenericForm
        fields={registerFields}
        onSubmit={handleRegister}
        submitButtonText={'Register'}
      />
    </Box>
  );
};

export default Register;
