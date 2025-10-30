import React from 'react';
import { Container, Paper, useTheme } from '@mui/material';
import { contentContainer } from '../../../style/muiComponentStyles/containerStyles';
import GenericTabs from '../../../components/tabs/Tabs';
import { TabData } from '../../../components/tabs/types';

const UserManagementDashboard: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);

    const tabs: TabData[] = [
        {
            label: "Permissions",
            content: <Paper>Permissions</Paper>
        },
        {
            label: "Roles",
            content: <Paper>Roles</Paper>
        },
        {
            label: "Users",
            content: <Paper>Users</Paper>
        },
    ]    

    return (
        <Container sx={styles.root}>
            <GenericTabs tabsData={tabs} />
        </Container>
    );
};

export default UserManagementDashboard;
