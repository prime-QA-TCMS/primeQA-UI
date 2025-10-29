
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Popup from '../../components/popup/popup';
import { CustomButton } from '../../components/forms/types';
import GenericForm from '../../components/forms/Form';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import { loginContainer } from '../../style/muiComponentStyles/containerStyles';
import { loginFormFields } from '../../Forms/UserManagement';

const Login: React.FC = () => {
    const theme = useTheme();
    const styles = loginContainer(theme);
    const navigate = useNavigate();

    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
    const handleRegisterOpen = () => setIsRegisterPopupOpen(true);
    const handleRegisterClose = () => setIsRegisterPopupOpen(false);

    const [isForgotPasswordPopupOpen, setIsForgotPasswordPopupOpen] = useState(false);
    const handleForgotPasswordOpen = () => setIsForgotPasswordPopupOpen(true);
    const handleForgotPasswordClose = () => setIsForgotPasswordPopupOpen(false);

    const handleLogin = async (formData: { [key: string]: any }) => {
        try {
            navigate('/dashboard');
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    
    const customButtons: CustomButton[] = [
        {
            text: "Register",
            onClick: () => {handleRegisterOpen()},
            color: 'primary',
            variant: 'contained'
        },
        {
            text: "Forgot Password?",
            onClick: () => {handleForgotPasswordOpen()},
            color: 'primary'
        }
    ];
    //
    return (
        <Container maxWidth="sm" sx={styles.root}>
            <GenericForm fields={loginFormFields} onSubmit={handleLogin} submitButtonText={'login'} customButtons={customButtons} />
            <Popup title="Register an account" open={isRegisterPopupOpen} onClose={handleRegisterClose} component={<Register />} />
            <Popup title="Forgot Password?" open={isForgotPasswordPopupOpen} onClose={handleForgotPasswordClose} component={<ForgotPassword />} />
        </Container>
    );
};

export default Login;
