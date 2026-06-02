import React from 'react';
import { Form as GenericForm } from 'fog-ui';
import type { FormField } from 'fog-ui';

interface ForgotPasswordProps {
  onSuccess?: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSuccess }) => {
  const handleLogin = async (formData: { [key: string]: any }) => {
    try {
      // TODO: Implement password reset logic
      console.log('Password reset requested for:', formData.email);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  const Fields: FormField[] = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
  ];

  return <GenericForm fields={Fields} onSubmit={handleLogin} submitButtonText={'Reset Password'} />;
};

export default ForgotPassword;
