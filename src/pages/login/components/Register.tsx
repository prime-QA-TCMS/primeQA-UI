import React from 'react';
import GenericForm from '../../../components/forms/Form';
import { FormField } from '../../../components/forms/types';


const Register: React.FC = () => {
    const handleLogin = async (formData: { [key: string]: any }) => {
        // TBD
    };

    const registerFields: FormField[] = [
        { 
            name: 'fristName', 
            label: 'First Name(s)', 
            type: 'text', 
            required: true
        },
        { 
            name: 'lastName', 
            label: 'Last Name', 
            type: 'text', 
            required: true
        },
        { 
            name: 'email', 
            label: 'Email Address', 
            type: 'email', 
            required: true
        },
        { 
            name: 'password', 
            label: 'Password', 
            type: 'password', 
            required: true, 
            minLength: 6
        }
    ];

    return (
        <GenericForm fields={registerFields} onSubmit={handleLogin} submitButtonText={'Register'} />
    );
};

export default Register;
