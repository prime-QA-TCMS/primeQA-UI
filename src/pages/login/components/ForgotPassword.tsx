import { useNavigate } from 'react-router-dom';
import React from 'react';
import GenericForm from '../../../components/forms/Form';
import { FormField } from '../../../components/forms/types';


const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData: { [key: string]: any }) => {
        try {
            navigate('/dashboard');
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const Fields: FormField[] = [
        { 
            name: 'email', 
            label: 'Email Address', 
            type: 'email', 
            required: true
        }
    ];

    return (
        <GenericForm fields={Fields} onSubmit={handleLogin} submitButtonText={'Reset Password'} />
    );
};

export default ForgotPassword;
