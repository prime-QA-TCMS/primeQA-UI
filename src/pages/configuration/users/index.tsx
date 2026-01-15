import React, { useState, useEffect } from 'react';
import { Container, useTheme } from '@mui/material';
import { contentContainer } from '../../../style/muiComponentStyles/containerStyles';
import { Tabs as GenericTabs, DataLoading } from "fog-ui";
import type { TabData } from "fog-ui";
import { UserAPI } from '../../../api';
import { Role } from '../../../types';
import UsersTab from './components/UsersTab';
import RolesTab from './components/RolesTab';
import PermissionsTab from './components/PermissionsTab';

const UserManagementDashboard: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);

    // Roles state (needed for users tab)
    const [roles, setRoles] = useState<Role[]>([]);
    const [loadingRoles, setLoadingRoles] = useState(true);

    // Fetch roles
    const fetchRoles = async () => {
        setLoadingRoles(true);
        try {
            const data = await UserAPI.roleGetAll();
            setRoles(data || []);
        } catch (error) {
            console.error('Error fetching roles:', error);
            setRoles([]);
        } finally {
            setLoadingRoles(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    // Don't render tabs until roles are loaded
    if (loadingRoles) {
        return (
            <Container sx={styles.root}>
                <DataLoading />
            </Container>
        );
    }

    const tabs: TabData[] = [
        {
            label: "Users",
            content: <UsersTab roles={roles} />
        },
        {
            label: "Roles",
            content: <RolesTab />
        },
        {
            label: "Permissions",
            content: <PermissionsTab />
        },
    ];

    return (
        <Container sx={styles.root}>
            <GenericTabs tabsData={tabs} />
        </Container>
    );
};

export default UserManagementDashboard;
