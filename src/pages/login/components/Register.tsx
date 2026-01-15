import React, { useState } from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { Form as GenericForm } from "fog-ui";
import type { FormField } from "fog-ui";
import { UserAPI } from '../../../api';
import type { RegisterRequest } from '../../../types';

interface RegisterProps {
    onSuccess?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (formData: { [key: string]: any }) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // TODO: This roleId is hardcoded to admin role (69037d7e04c235dfa038bc3a).
            // In the future, this should be dynamic or default to a regular user role.
            const registerData: RegisterRequest = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                role: '69037d7e04c235dfa038bc3a',
            };

            console.log('Register data being sent:', registerData);
            const result = await UserAPI.register(registerData);

            if (result) {
                setSuccess(true);

                // Optionally auto-login the user after registration
                const { user, accessToken, refreshToken } = result;
                localStorage.setItem("userId", user.id);
                localStorage.setItem("token", accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                // Call success callback if provided
                if (onSuccess) {
                    setTimeout(() => {
                        onSuccess();
                    }, 1500);
                }
            }
        } catch (err: any) {
            const message = err.response?.data?.message || err.message || "Registration failed. Please try again.";
            setError(message);
            console.error("Error during registration:", err);
        } finally {
            setLoading(false);
        }
    };

    const registerFields: FormField[] = [
        {
            name: 'firstName',
            label: 'First Name',
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
        },
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            required: true,
            minLength: 6,
            validate: (value: string, formData: { [key: string]: any }) => {
                if (value !== formData.password) {
                    return 'Passwords do not match';
                }
                return true;
            }
        }
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
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Registration successful! Redirecting...
                </Alert>
            )}
            <GenericForm
                fields={registerFields}
                onSubmit={handleRegister}
                submitButtonText={'Register'}
            />
        </Box>
    );
};

export default Register;
