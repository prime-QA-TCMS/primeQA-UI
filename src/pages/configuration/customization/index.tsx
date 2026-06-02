import React from 'react';
import { Container, useTheme } from '@mui/material';
import { contentContainer } from 'fog-ui';
import { Tabs as GenericTabs } from 'fog-ui';
import type { TabData } from 'fog-ui';
import BrandingForm from './components/Branding';
import ParametersTab from './components/ParametersTab';
import IntegrationsTab from './components/IntegrationsTab';
import EnvironmentsTab from './components/EnvironmentsTab';

const CustomizationDashboard: React.FC = () => {
  const theme = useTheme();
  const styles = contentContainer(theme);

  const tabs: TabData[] = [
    {
      label: 'Branding',
      content: <BrandingForm />,
    },
    {
      label: 'Parameters',
      content: <ParametersTab />,
    },
    {
      label: 'Integrations',
      content: <IntegrationsTab />,
    },
    {
      label: 'Environments',
      content: <EnvironmentsTab />,
    },
  ];

  return (
    <Container sx={styles.root}>
      <GenericTabs tabsData={tabs} />
    </Container>
  );
};

export default CustomizationDashboard;
