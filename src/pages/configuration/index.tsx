import React from 'react';
import { Container, useTheme } from '@mui/material';
import { contentContainer } from '../../style/muiComponentStyles/containerStyles';

const ConfigurationDashboard: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);

    return (
        <Container sx={styles.root}>
            I'm the ConfigurationDashboard PAGE
        </Container>
    );
};

export default ConfigurationDashboard;
