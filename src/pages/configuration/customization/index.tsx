import React from 'react';
import { Container, Paper, useTheme } from '@mui/material';
import { contentContainer } from '../../../style/muiComponentStyles/containerStyles';
import GenericTabs from '../../../components/tabs/Tabs';
import { TabData } from '../../../components/tabs/types';
import BrandingForm from './branding/Branding';

const CustomizationDashboard: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);

    const tabs: TabData[] = [
        {
            label: "Branding",
            content: <BrandingForm />
        }
    ]    

    return (
        <Container sx={styles.root}>
            <GenericTabs tabsData={tabs} />
        </Container>
    );
};

export default CustomizationDashboard;
