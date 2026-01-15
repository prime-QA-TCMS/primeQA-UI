import React from 'react';
import { Container, Paper, useTheme } from '@mui/material';
import { contentContainer } from '../../../style/muiComponentStyles/containerStyles';
import { Tabs as GenericTabs } from "fog-ui";
import type { TabData } from "fog-ui";
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
