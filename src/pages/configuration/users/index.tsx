import React, { useState, useEffect } from 'react';
import { Container, useTheme } from '@mui/material';
import { contentContainer, useService } from 'fog-ui';
import { Tabs as GenericTabs, DataLoading } from 'fog-ui';
import type { TabData } from 'fog-ui';
import { UserAPI } from '../../../api';
import { Role } from '../../../types';
import UsersTab from './components/UsersTab';
import RolesTab from './components/RolesTab';

const UserManagementDashboard: React.FC = () => {
  const theme = useTheme();
  const styles = contentContainer(theme);

  const authService = useService('auth');
  const userService = useService('user');
  const userAPI = UserAPI(authService, userService);

  // Roles state (needed for users tab)
  const [roles, setRoles] = useState<Role[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  // Fetch roles
  const fetchRoles = async () => {
    setLoadingRoles(true);
    try {
      const response = await userAPI.roleGetAll();
      const roles = response?.data?.items || [];
      setRoles(roles);
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
        <DataLoading columns={[]} />
      </Container>
    );
  }

  const tabs: TabData[] = [
    {
      label: 'Users',
      content: <UsersTab roles={roles} />,
    },
    {
      label: 'Roles',
      content: <RolesTab />,
    },
  ];

  return (
    <Container sx={styles.root}>
      <GenericTabs tabsData={tabs} />
    </Container>
  );
};

export default UserManagementDashboard;
