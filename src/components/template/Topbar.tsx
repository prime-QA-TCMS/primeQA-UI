import React from 'react';
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material';
import { TopBarProps } from './types';
import { useNavigate } from 'react-router-dom';

const Topbar: React.FC<TopBarProps> = ({ pageTitle }) => {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/configuration');
    };
  
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.getItem('pageTitle');
        navigate('/');
    };

    return (
        <AppBar position="absolute" style={{width: "calc(100vw - 300px)", left: "300px"}}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" component="div">
                    {pageTitle}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button variant="contained" onClick={handleAdminClick}>Admin</Button>
                    <Button variant="contained" color="error" onClick={handleLogout}>Log Out</Button>
                    <Avatar/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
